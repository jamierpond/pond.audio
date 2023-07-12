import Calendar from "./Calendar"

// Studied at QMUL London
// Studied at the London College of Music
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-20">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center">
          Jamie Pond
        </h1>
        <h3 className="text-2xl font-bold text-center mt-4">
          <a href="mailto:jamie@mayk.it">jamie@mayk.it</a>
        </h3>
        <div className="flex flex-col text-center items-center justify-center p-8 space-y-8">
          <p>I&apos;m Lead Audio Software Engineer at <a href="https://www.mayk.it"><b>mayk</b></a>.</p>
          <p>I studied <b>Sound & Music Computing MSc</b> at <a href="https://www.qmul.ac.uk"><b>Queen Mary University of London</b></a>.</p>
          <p>I spoke at ADC 2021 about <a href="https://www.youtube.com/watch?v=X8dPANPmC7E&ab_channel=JUCE"><b>using compiler intrinsics in your code</b></a>.</p>
          <p>I&apos;m a mentor in the ADC 2023 Mentorship Program.</p>
          <p>Please feel free to hit me up!</p>
          <div className="flex flex-row space-x-4">
            <a href="https://www.linkedin.com/in/jamierpond"><img src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" className="w-8 h-8" /></a>
          </div>
        </div>
        <Calendar />
      </div>
    </main>
  )
}
