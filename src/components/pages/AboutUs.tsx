
import React from 'react';
import { CheckCircle, Shield, Users, Trophy } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">We help you find your sanctuary</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              UrbanNest was founded with a simple mission: to bridge the gap between premium properties and quality residents. 
              We believe that everyone deserves a space they're proud to call home, and every landlord deserves peace of mind.
            </p>
          </div>
          
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {[
              { name: 'Verified Listings', description: 'Every property goes through a multi-point verification process.', icon: Shield },
              { name: 'Expert Agents', description: 'Our agents are top 1% in the industry with deep local knowledge.', icon: Users },
              { name: 'Seamless Booking', description: 'Schedule tours and sign leases entirely online in minutes.', icon: CheckCircle },
              { name: 'Award Winning', description: 'Voted #1 rental platform for customer satisfaction in 2024.', icon: Trophy },
            ].map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-semibold text-gray-900">
                  <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="inline text-gray-600"> — {feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Commitment</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Whether you are a tenant looking for your first studio or a landlord managing an entire portfolio, 
              UrbanNest provides the tools and support you need to thrive. Our platform uses AI-powered matchmaking 
              to ensure high compatibility and long-term residency.
            </p>
            <div className="mt-10 flex gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600">15k+</p>
                <p className="text-sm text-gray-500">Properties</p>
              </div>
              <div className="h-10 w-px bg-gray-200 mx-4"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600">50k+</p>
                <p className="text-sm text-gray-500">Happy Residents</p>
              </div>
              <div className="h-10 w-px bg-gray-200 mx-4"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600">98%</p>
                <p className="text-sm text-gray-500">Retention Rate</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80" 
              alt="UrbanNest Office"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
