export default function Testimonials() {
    return (
        <div className="mt-16 max-w-3xl mx-6 md:mx-auto">
            <h3 className="text-center text-gray-500 uppercase text-sm font-medium mb-6">
                Trusted by job seekers worldwide
            </h3>
            <div className="bg-stone-900 p-6 rounded-lg shadow-sm border border-gray-200">
                <blockquote className="text-lg italic text-gray-200 mb-4">
                    &quot; This tool helped me identify gaps in my resume I never noticed.
                    After implementing the suggestions, I got 3x more interview calls!
                    &quot;
                </blockquote>
                <div className="flex items-center">
                    <div className="h-10 w-10 flex justify-center items-center rounded-full bg-stone-800 mr-4">
                        <span className="font-semibold">SK</span>
                    </div>
                    <div>
                        <p className="font-medium">Sarah K.</p>
                        <p className="text-gray-400">Software Engineer, hired at Google</p>
                    </div>
                </div>
            </div>
        </div>
    )
}