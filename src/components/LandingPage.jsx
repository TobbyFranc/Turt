import React from 'react'
import Nav from './Nav'
import Hero from './Hero'
import About from './About'
import Map from './Map'
import Footer from './LandingFooter'
// import Partners from './Partners'
// import Contact from './Contact'
import AboutUs from './AboutUs'
import Faqs from './Faqs'
import Banner from './Banner'
import Team from './Team'
import Testimonials from './Testimonial'

const LandingPage = () => {
  return (
    <div>
        <Nav />
        <Hero />
        < AboutUs />
        <About />
        {/* < Partners /> */}
        <Map />
        <Team />
        <Faqs />
        {/* < Contact /> */}
        <Testimonials />
        <Banner />
        {/* <Blog /> */}
        {/* <Subscribe /> */}
        {/* <DownloadApp /> */}
        {/* <ContactForm /> */}
        {/* <SocialMediaLinks /> */}
        {/* <NewsletterSignup /> */}

        <Footer />
    </div>
  )
}

export default LandingPage