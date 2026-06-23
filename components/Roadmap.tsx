const steps = [
  {
    num: 'Step 01',
    title: 'Register',
    body: 'Sign up for your workshop tracks at ₹199 each, or register your competition team for ₹399 flat. No account required for the workshop.',
  },
  {
    num: 'Step 02',
    title: 'Attend the workshop',
    body: 'Spend a full day on campus learning from working professionals across your chosen tracks.',
  },
  {
    num: 'Step 03',
    title: 'Theme revealed',
    body: 'The official reel theme is announced at the workshop. Your 7-day submission window opens the moment you walk out the door.',
  },
  {
    num: 'Step 04',
    title: 'Create your reel',
    body: "Plan, shoot, and edit your reel within 7 days. Use everything you learned in the workshop or don't. What matters is the work.",
  },
  {
    num: 'Step 05',
    title: 'Submit',
    body: 'Submit your reel link before the deadline. All teams workshop or not compete on a level playing field.',
  },
  {
    num: 'Step 06',
    title: 'Win & get recognised',
    body: 'Top reels are judged on creativity, storytelling, and impact. Cash prizes, certificates, and campus-wide recognition for the winners.',
  },
]

export default function Roadmap() {
  return (
    <section className="roadmap" id="roadmap">
      <span className="section-tag">How it works</span>
      <h2 className="section-head">The Campus Impact <em>roadmap</em></h2>
      <table className="steps-table">
        <tbody>
          {steps.map((step) => (
            <tr key={step.num}>
              <td className="step-num">{step.num}</td>
              <td className="step-bar"><div className="step-bar-inner"></div></td>
              <td>
                <span className="step-title">{step.title}</span>
                <span className="step-body">{step.body}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
