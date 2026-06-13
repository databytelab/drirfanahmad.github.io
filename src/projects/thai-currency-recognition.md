---
title: "Reading Money by Camera: Recognising New Thai Banknotes for the Visually Impaired"
year: "2024"
role: "Lead author · Deep learning & data curation"
venue: "IEEE 17th Int. Conf. on Signal Processing & Communication Systems (ICSPCS 2024), Gold Coast, Australia"
excerpt: "A deep-learning system that identifies new Thai banknotes from a phone camera — even folded, dimly lit, or against cluttered backgrounds — at 99.8% validation accuracy, built with transfer learning on Xception."
stack: ["TensorFlow", "Keras", "Xception", "Transfer Learning", "Python", "OpenCV"]
paper: "https://doi.org/10.1109/ICSPCS63175.2024.10815772"
github: ""
type: "project"
---
Imagine standing at a market stall and not being able to tell a 100-baht note from a 1,000-baht one. For millions of people with severe vision impairment, that is an everyday risk. This project asked a deliberately practical question: **can an ordinary phone camera identify a banknote reliably enough to be trusted with someone's money?**

:::stats
43M — People worldwide who are blind
3,600 — Banknote images we collected and labelled by hand
5 — New Thai denominations recognised (20–1000 ฿)
99.8% — Validation accuracy achieved
:::

::section 01 — Why this problem is worth solving

Around 43 million people are blind and over 200 million more live with significant vision impairment. In Thailand alone there are roughly **185,000 visually impaired citizens**. Older banknotes leaned on tactile cues, but the relief dots on the *new* Thai notes fade with everyday wear — and once they fade, the note becomes unreadable by touch.

Existing research mostly targets the currencies of wealthy countries, or the *old* Thai notes. For the new series, robust recognition simply did not exist. That gap — a real human need with no good solution — is exactly the kind of problem worth pointing a neural network at.

:::pullquote -- On the actual goal
We weren't chasing a leaderboard. We were trying to let someone identify a banknote in a busy market by pointing a phone at it — folded, in bad light, on a cluttered table.
:::

::section 02 — The hard part wasn't the model. It was the data.

There was no public dataset for the new Thai notes, so we built one. The temptation in any image project is to photograph clean, flat notes on a white desk — and then watch the model fail the moment it meets the real world. We did the opposite, and **collected for the conditions a blind user actually faces.**

:::actions
**Five denominations, 720 images each**
20, 50, 100, 500, and 1000 baht — a balanced 3,600-image dataset, so the model never gets to "cheat" by favouring a more common class.
---
**Every orientation a fumbling hand produces**
Front, back, rotated 180°, and half-folded from the top and bottom — because a note handed over in real life is rarely flat and upright.
---
**Three backgrounds, many lighting conditions**
Dark, plain white, and visually cluttered scenes under varied lighting — teaching the model to ignore the table and focus on the note.
---
**Captured on real phones, then standardised**
Shot on iPhone 12 and 13 Pro Max at full resolution, converted HEIC → JPEG, and resized to 250×250 pixels for training.
:::

:::callout 💡 The real lesson
A model is only as honest as its data. By photographing notes folded, dimly lit, and on messy tables, the dataset taught the model the *actual* task — not a tidy laboratory version of it. Most of the engineering value in this project lived here, before a single epoch ran.
:::

The 3,600 images were split **70 / 30** into 2,520 for training and 1,080 for validation, keeping all five denominations evenly represented in both sets.

:::imagegrid
::image{src=/projects/thai-currency-recognition/dataset-samples.jpg caption="New Thai notes across orientations, folds, and backgrounds"}
::image{src=/projects/thai-currency-recognition/data-split.jpg caption="Balanced 70/30 train–validation split across all five denominations"}
:::

::section 03 — Standing on the shoulders of ImageNet

Training a deep network from scratch needs enormous amounts of data — far more than 3,600 images. So instead of starting from zero, we used **transfer learning**: take a network that has already learned to *see* from millions of images, and re-teach only the parts that need to know about banknotes.

The backbone is **Xception** ("Extreme Inception"), which is built almost entirely from *depthwise separable convolutions*. In plain terms, it splits the expensive job of a normal convolution into two cheaper steps — one that looks across space, one that looks across colour channels. The result is a deep, accurate network with far less computation, which matters if the end goal is a phone app.

::image{src=/projects/thai-currency-recognition/architecture.jpg caption="Fine-tuned Xception pipeline: ImageNet weights → frozen early layers → a new global-average-pooling + softmax head predicting one of five denominations"}

The adaptation was small and surgical:

:::actions
**Start from ImageNet weights**
Load Xception pre-trained on ImageNet — it already understands edges, textures, and shapes.
---
**Freeze the early layers**
The first layers detect universal, low-level features (edges, gradients). Keep them frozen — there's nothing currency-specific to relearn there.
---
**Fine-tune the rest + a new head**
Replace the classifier with a Global Average Pooling layer and a 5-way softmax, then fine-tune the deeper layers so they specialise in distinguishing denominations.
:::

Here is the heart of the model — the transfer-learning setup:

```python
from tensorflow.keras.applications.xception import Xception, preprocess_input
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

# 1. Pre-trained Xception backbone, without its ImageNet classifier head
base = Xception(include_top=False, weights='imagenet',
                input_shape=(250, 250, 3))

# 2. New lightweight head for our 5 denominations
x = GlobalAveragePooling2D()(base.output)
output = Dense(5, activation='softmax', name='softmax')(x)
model = Model(inputs=base.input, outputs=output)

# 3. Freeze the early (generic) layers; fine-tune the rest
for layer in model.layers[:FREEZE_LAYERS]:
    layer.trainable = False
for layer in model.layers[FREEZE_LAYERS:]:
    layer.trainable = True

# 4. Compile for multi-class classification
model.compile(optimizer=Adam(learning_rate=2e-4),
              loss='categorical_crossentropy',
              metrics=['accuracy'])
```

The training configuration was deliberately modest — and notably, **no data augmentation was used**. Because the dataset already contained the rotations, folds, and lighting variety that augmentation usually fakes, the real images did that job better.

| Setting | Value |
|---|---|
| Input size | 250 × 250 × 3 |
| Batch size | 8 |
| Optimizer | Adam (lr = 0.0002) |
| Loss | Categorical cross-entropy |
| Epochs | 40, with early stopping (stopped at 30) |
| Data augmentation | None |

::section 04 — Did it actually work?

Yes — convincingly. Validation accuracy reached **100% by the second epoch** and training accuracy hit 100% by the eleventh, settling at an average of **99.5% training / 99.8% validation**. The loss curves fell smoothly, with only small spikes on the hardest cluttered-background samples.

:::imagegrid
::image{src=/projects/thai-currency-recognition/accuracy-curve.jpg caption="Training vs. validation accuracy across epochs"}
::image{src=/projects/thai-currency-recognition/loss-curve.jpg caption="Training vs. validation loss across epochs"}
:::

The confusion matrix on the 1,080 validation images was the headline result: **216 correct predictions in every class, zero mistakes** — perfect precision, recall, and F1 across all five denominations.

::image{src=/projects/thai-currency-recognition/confusion-matrix.jpg caption="Confusion matrix on the 1,080 validation images — 216 correct per class, zero misclassifications"}

| Denomination | Precision | Recall | F1-score |
|---|---|---|---|
| 20 ฿ | 1.00 | 1.00 | 1.00 |
| 50 ฿ | 1.00 | 1.00 | 1.00 |
| 100 ฿ | 1.00 | 1.00 | 1.00 |
| 500 ฿ | 1.00 | 1.00 | 1.00 |
| 1000 ฿ | 1.00 | 1.00 | 1.00 |

The more demanding test came from **entirely unseen notes against cluttered backgrounds** — the messy reality the model will actually meet:

| Note | Confidence on unseen, cluttered images |
|---|---|
| 20 ฿ | 100.00% |
| 50 ฿ | 99.86% |
| 100 ฿ | 99.99% |
| 500 ฿ | 98.03% |
| 1000 ฿ | 99.99% |

::image{src=/projects/thai-currency-recognition/predictions.jpg caption="Predictions on unseen notes against cluttered backgrounds, with per-note confidence scores"}

:::callout 🔬 Staying honest about "perfect" scores
Near-perfect validation accuracy should always raise an eyebrow — it can signal a dataset that's too easy or leakage between splits. Two things give us confidence here: the loss curves generalise (validation loss tracks training loss rather than diverging), and the model still scores 98–100% on a *separate* set of unseen, cluttered notes it never trained on. That said, the next honest step is a larger, more adversarial test set — which is exactly where this work goes next.
:::

::section 05 — What I'd build next

The model is accurate; the mission is to make it *useful in someone's hand*.

- **Put it on the phone.** Convert to a lightweight on-device model so recognition runs in real time, offline, in an accessible Android app with spoken output.
- **Try leaner backbones.** MobileNet and friends trade a sliver of accuracy for a much smaller footprint — a good deal when the target is a budget phone.
- **Stress-test harder.** Motion blur, glare, torn notes, and partial occlusion are the next frontier for real-world robustness.

:::callout 🎯 The takeaway
The interesting work in applied machine learning is rarely the model — it's framing the problem like the person who'll use it, and collecting data that respects their reality. A standard architecture plus a thoughtfully built dataset solved a problem that "fancier" approaches had left open.
:::

*This work was published at IEEE ICSPCS 2024 and grew out of a supervised senior project. Use the buttons above to read the full paper.*
