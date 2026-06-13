import {
  User, Camera, Cpu, Volume2, Banknote, RotateCw, Layers, Image as ImageIcon,
  Scaling, Split, Percent, ShoppingCart, Store, Bus, Coins,
  Smartphone, WifiOff, ShieldCheck, Feather, Check,
} from 'lucide-react'
import { CaseSection, StatTile, FlowSteps, StageCard, CodeCard, ConfusionMatrix, Figure } from './CaseStudyKit'

const CODE = `from tensorflow.keras.applications.xception import Xception
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

# Stage 1 — pre-trained Xception backbone (no ImageNet head)
base = Xception(include_top=False, weights='imagenet',
                input_shape=(250, 250, 3))

# Stage 3 — new lightweight head for our 5 denominations
x = GlobalAveragePooling2D()(base.output)
output = Dense(5, activation='softmax')(x)
model = Model(inputs=base.input, outputs=output)

# Stage 2 — freeze early (generic) layers, fine-tune the rest
for layer in model.layers[:FREEZE_LAYERS]:
    layer.trainable = False
for layer in model.layers[FREEZE_LAYERS:]:
    layer.trainable = True

# Stage 4 — fine-tune with a small learning rate
model.compile(optimizer=Adam(learning_rate=2e-4),
              loss='categorical_crossentropy',
              metrics=['accuracy'])`

const CLASS_ROWS = ['20 ฿', '50 ฿', '100 ฿', '500 ฿', '1000 ฿']

export default function ThaiCurrencyStudy() {
  return (
    <>
      {/* 2 — IMPACT STATISTICS */}
      <CaseSection eyebrow="By the numbers" title="The impact at a glance"
        intro="A balanced dataset built by hand, a transfer-learning model, and accuracy high enough to be trusted with someone's money.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatTile value="43M" label="Blind people worldwide" />
          <StatTile value="3,600" label="Images collected & labelled" />
          <StatTile value="5" label="Thai denominations" />
          <StatTile value="99.8%" label="Validation accuracy" />
        </div>
      </CaseSection>

      {/* 3 — PROBLEM VISUALIZATION */}
      <CaseSection bg="soft" eyebrow="The problem" title="From a banknote to a spoken answer"
        intro="The new Thai notes' tactile relief dots fade with wear, leaving visually impaired users unable to tell denominations apart. The goal: point a phone, hear the answer.">
        <FlowSteps steps={[
          { icon: User, title: 'Visually impaired user', caption: "Can't distinguish notes" },
          { icon: Camera, title: 'Phone camera', caption: 'Points & captures' },
          { icon: Cpu, title: 'Xception model', caption: 'Recognises the note' },
          { icon: Volume2, title: 'Spoken denomination', caption: '“One hundred baht”' },
        ]} />
        <div className="max-w-sm mx-auto mt-8">
          <Figure src="/projects/thai-currency-recognition/app-demo.jpg"
                  alt="Prototype app identifying a Thai banknote"
                  caption="Prototype: point, capture, and hear the denomination" />
        </div>
      </CaseSection>

      {/* 4 — DATASET COLLECTION PIPELINE */}
      <CaseSection eyebrow="The dataset" title="The hard part wasn't the model — it was the data"
        intro="No public dataset existed for the new Thai notes, so we built one for the conditions a blind user actually faces.">
        <FlowSteps emphasizeLast={false} steps={[
          { icon: Banknote, title: 'Capture notes', caption: '5 denominations · 720 each' },
          { icon: RotateCw, title: 'Orientations', caption: 'Front, back, rotated 180°' },
          { icon: Layers, title: 'Folds', caption: 'Half-folded top & bottom' },
          { icon: ImageIcon, title: 'Backgrounds', caption: 'Dark · white · cluttered' },
          { icon: Scaling, title: 'Resize', caption: '250 × 250 px' },
          { icon: Split, title: 'Split', caption: '70 / 30 train–val' },
        ]} />
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Figure src="/projects/thai-currency-recognition/dataset-samples.jpg"
                  alt="Sample new Thai notes across orientations, folds, and backgrounds"
                  caption="Real captures — folded, dark, and cluttered conditions" />
          <Figure src="/projects/thai-currency-recognition/data-split.jpg"
                  alt="Balanced train and validation split across the five denominations"
                  caption="Balanced 70 / 30 split across all five denominations" />
        </div>
        <div className="blog-callout mt-8 max-w-3xl">
          <div className="blog-callout-label">💡 The lesson</div>
          <p>A model is only as honest as its data. By photographing notes folded, dimly lit, and on messy
            tables, the dataset taught the model the <em>actual</em> task — not a tidy laboratory version of it.</p>
        </div>
      </CaseSection>

      {/* 5 — MODEL ARCHITECTURE */}
      <CaseSection bg="cream" eyebrow="The model" title="Transfer learning on Xception"
        intro="Rather than train from scratch on 3,600 images, we re-used a network that already knows how to see, and re-taught only the parts that need to know about banknotes.">
        <FlowSteps steps={[
          { icon: ImageIcon, title: 'Input image', caption: '250 × 250 × 3' },
          { icon: Cpu, title: 'Xception backbone', caption: 'Depthwise separable conv' },
          { icon: Layers, title: 'Global Avg Pooling', caption: 'Feature vector' },
          { icon: Percent, title: 'Softmax', caption: '5 probabilities' },
          { icon: Banknote, title: 'Predicted note', caption: 'e.g. “100 ฿”' },
        ]} />
        <div className="max-w-2xl mx-auto mt-8">
          <Figure src="/projects/thai-currency-recognition/architecture.jpg"
                  alt="The formal fine-tuned Xception architecture"
                  caption="The formal Xception fine-tuning architecture from the paper" />
        </div>
      </CaseSection>

      {/* 6 — CODE EXPLANATION */}
      <CaseSection eyebrow="How it works" title="Four stages of fine-tuning"
        intro="The adaptation was small and surgical — four steps turn a general image network into a banknote specialist.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StageCard number="01" accent="#1A3A5C" title="Use pre-trained Xception">
            Load the ImageNet-trained backbone — it already understands edges, textures, and shapes.
          </StageCard>
          <StageCard number="02" accent="#0694A2" title="Freeze early layers">
            The first layers detect universal features. Keep them frozen — nothing currency-specific to relearn.
          </StageCard>
          <StageCard number="03" accent="#E8A020" title="Add pooling + softmax">
            Replace the classifier with Global Average Pooling and a 5-way softmax head.
          </StageCard>
          <StageCard number="04" accent="#2D6A9F" title="Fine-tune gently">
            Train the deeper layers with a small learning rate so currency features emerge without forgetting.
          </StageCard>
        </div>
        <CodeCard filename="train_currency_xception.py" code={CODE} />
      </CaseSection>

      {/* 7 — RESULTS DASHBOARD */}
      <CaseSection bg="soft" eyebrow="The results" title="A clean, honest dashboard"
        intro="Validation accuracy reached 100% by the second epoch and settled at 99.8% — with zero misclassifications across all five denominations.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatTile value="99.5%" label="Avg training accuracy" />
          <StatTile value="99.8%" label="Avg validation accuracy" />
          <StatTile value="98.0%" label="Lowest unseen confidence" />
          <StatTile value="0" label="Misclassifications" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Confusion matrix */}
          <div className="card-gradient">
            <h4 className="font-serif text-base text-ink mb-1">Confusion matrix</h4>
            <p className="text-xs text-muted mb-4">1,080 validation images · 216 per class</p>
            <ConfusionMatrix labels={['20', '50', '100', '500', '1000']} diagonal={216} />
          </div>

          {/* Class-level performance */}
          <div className="card-gradient overflow-x-auto">
            <h4 className="font-serif text-base text-ink mb-1">Class-level performance</h4>
            <p className="text-xs text-muted mb-4">Precision · Recall · F1 on the validation set</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted border-b border-navy-100">
                  <th className="py-2 font-semibold">Denomination</th>
                  <th className="py-2 font-semibold text-center">Precision</th>
                  <th className="py-2 font-semibold text-center">Recall</th>
                  <th className="py-2 font-semibold text-center">F1</th>
                </tr>
              </thead>
              <tbody>
                {CLASS_ROWS.map(d => (
                  <tr key={d} className="border-b border-gray-100 last:border-0">
                    <td className="py-2 font-medium text-ink">{d}</td>
                    <td className="py-2 text-center font-mono text-navy-600">1.00</td>
                    <td className="py-2 text-center font-mono text-navy-600">1.00</td>
                    <td className="py-2 text-center font-mono text-navy-600">1.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Training curves (drop the figure images in to light these up) */}
        <div className="grid md:grid-cols-2 gap-6">
          <Figure src="/projects/thai-currency-recognition/accuracy-curve.jpg"
                  alt="Training vs. validation accuracy across epochs"
                  caption="Training vs. validation accuracy across epochs" />
          <Figure src="/projects/thai-currency-recognition/loss-curve.jpg"
                  alt="Training vs. validation loss across epochs"
                  caption="Training vs. validation loss across epochs" />
        </div>

        <div className="max-w-3xl mx-auto mt-6">
          <Figure src="/projects/thai-currency-recognition/predictions.jpg"
                  alt="Model predictions on unseen notes against cluttered backgrounds"
                  caption="Predictions on unseen, cluttered notes — with per-note confidence" />
        </div>

        <div className="blog-callout mt-8 max-w-3xl">
          <div className="blog-callout-label">🔬 Staying honest about “perfect” scores</div>
          <p>Near-perfect accuracy should always raise an eyebrow. Two things give us confidence: the validation
            loss tracks the training loss rather than diverging, and the model still scores 98–100% on a
            <em> separate</em> set of unseen, cluttered notes it never trained on.</p>
        </div>
      </CaseSection>

      {/* 8 — REAL-WORLD IMPACT */}
      <CaseSection eyebrow="Why it matters" title="Independence in everyday moments"
        intro="Reliable, instant denomination recognition restores confidence in the ordinary transactions most people never think twice about.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: ShoppingCart, title: 'Markets & vendors', body: 'Pay the right note at a busy stall without asking a stranger for help.' },
            { icon: Store, title: 'Shops & checkout', body: 'Verify change and hand over exact amounts with confidence.' },
            { icon: Bus, title: 'Public transport', body: 'Pay fares quickly and independently, even in poor lighting.' },
            { icon: Coins, title: 'Daily independence', body: 'Manage cash privately — no need to rely on others to read money.' },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="card-gradient">
              <div className="w-11 h-11 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center mb-3">
                <Icon size={20} />
              </div>
              <h4 className="font-serif text-base text-ink mb-1.5">{title}</h4>
              <p className="text-sm text-body leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </CaseSection>

      {/* 9 — FUTURE WORK */}
      <CaseSection bg="navy" eyebrow="What's next" title="From model to product"
        intro="The model is accurate. The mission is to put it in someone's hand.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Smartphone, title: 'Mobile app', body: 'A native Android app built for screen-reader workflows.' },
            { icon: WifiOff, title: 'Offline inference', body: 'On-device recognition that works without a connection.' },
            { icon: Volume2, title: 'Spoken output', body: 'Clear, instant audio feedback of the detected note.' },
            { icon: ShieldCheck, title: 'Robust testing', body: 'Motion blur, glare, torn notes, and partial occlusion.' },
            { icon: Feather, title: 'Lightweight models', body: 'MobileNet-class backbones for budget phones.' },
            { icon: Check, title: 'Field validation', body: 'Trials with visually impaired users in real settings.' },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title}
                 className="relative rounded-xl p-5 pl-6 overflow-hidden bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] hover:-translate-y-0.5 transition-all">
              <span className="absolute top-0 left-0 bottom-0 w-1" style={{ background: '#E8A020' }} />
              <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
                   style={{ background: 'rgba(232,160,32,0.18)', color: '#F2B843' }}>
                <Icon size={20} />
              </div>
              <h4 className="font-serif text-base text-white mb-1.5">{title}</h4>
              <p className="text-sm text-white/70 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </CaseSection>
    </>
  )
}
