// Call to Action Component
export const CallToAction = () => {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Excellence Academy Family</h2>
            <p className="text-xl text-blue-100 mb-8">
              Take the first step toward providing your child with an exceptional educational experience that will prepare them for a successful future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/admissions" 
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-4 rounded-lg shadow-lg transition-all transform hover:-translate-y-1"
              >
                Apply Now
              </a>
              <a 
                href="/contact-us" 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all transform hover:-translate-y-1"
              >
                Schedule a Visit
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  };