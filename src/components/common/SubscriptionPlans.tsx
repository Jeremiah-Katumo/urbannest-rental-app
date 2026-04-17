
import React from 'react';
import { SubscriptionPlan, User } from '../../types';
import { Check, Zap, Shield, Crown, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SubscriptionPlansProps {
  plans: SubscriptionPlan[];
  currentUser: User;
  onSubscribe: (plan: SubscriptionPlan) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ plans, currentUser, onSubscribe }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Business <span className="text-indigo-600">Growth</span> Plans</h1>
        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
          Unlock professional management tools, advanced analytics, and priority placement in the UrbanNest ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={cn(
              "bg-white rounded-[3rem] border-2 p-10 flex flex-col transition-all hover:shadow-2xl hover:-translate-y-2 group",
              currentUser.subscriptionPlanId === plan.id 
                ? "border-indigo-600 shadow-xl shadow-indigo-100" 
                : "border-slate-100 shadow-sm"
            )}
          >
            <div className="flex items-center justify-between mb-8">
              <div className={cn(
                "p-4 rounded-2xl",
                plan.role === 'LANDLORD' ? "bg-indigo-50 text-indigo-600" :
                plan.role === 'AGENT' ? "bg-purple-50 text-purple-600" : "bg-emerald-50 text-emerald-600"
              )}>
                {plan.role === 'LANDLORD' ? <Crown className="w-8 h-8" /> :
                 plan.role === 'AGENT' ? <Zap className="w-8 h-8" /> : <Shield className="w-8 h-8" />}
              </div>
              {currentUser.subscriptionPlanId === plan.id && (
                <span className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Active Plan</span>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-slate-400 font-medium text-sm">{plan.description}</p>
            </div>

            <div className="mb-10 flex items-baseline gap-1">
              <span className="text-5xl font-black text-slate-900">${plan.price}</span>
              <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">/ {plan.interval.toLowerCase()}</span>
            </div>

            <div className="space-y-4 flex-1 mb-10">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-bold text-slate-600">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => onSubscribe(plan)}
              disabled={currentUser.subscriptionPlanId === plan.id}
              className={cn(
                "w-full py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all",
                currentUser.subscriptionPlanId === plan.id
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-indigo-600 shadow-xl shadow-slate-100 hover:shadow-indigo-100"
              )}
            >
              {currentUser.subscriptionPlanId === plan.id ? 'Already Subscribed' : `Upgrade to ${plan.role}`}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <h3 className="text-3xl font-black mb-4">Enterprise Solutions</h3>
          <p className="text-slate-400 font-medium">Need a custom plan for a large real estate firm or a national logistics fleet? Contact our sales team for tailored pricing and dedicated account management.</p>
        </div>
        <button className="px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-indigo-400 hover:text-white transition-all">Contact Sales</button>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
