"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { DollarSign, Shield, ChevronRight, Ticket, Users2, ChartNoAxesCombined } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useGetPricingRulesQuery, useCreatePricingRulesMutation } from "@/redux/apiSlices/pricingRulesSlice";
import { toast } from "sonner";

export default function SettingsPage() {
  const [platformFee, setPlatformFee] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [withdrawFee, setWithdrawFee] = useState("");
  const [minWithdrawAmount, setMinWithdrawAmount] = useState("");

  const { data: pricingResponse, isLoading: isQueryLoading } = useGetPricingRulesQuery(undefined);
  const [createPricingRules, { isLoading: isSaving }] = useCreatePricingRulesMutation();

  useEffect(() => {
    if (pricingResponse) {
      const rules = pricingResponse.data || pricingResponse;
      if (rules) {
        setPlatformFee(rules.platform_fee !== undefined ? String(rules.platform_fee) : "");
        setTaxAmount(rules.tax_amount !== undefined ? String(rules.tax_amount) : "");
        setWithdrawFee(rules.withdraw_fee !== undefined ? String(rules.withdraw_fee) : "");
        setMinWithdrawAmount(rules.min_withdraw_amount !== undefined ? String(rules.min_withdraw_amount) : "");
      }
    }
  }, [pricingResponse]);

  const handleSave = async () => {
    try {
      const body = {
        platform_fee: Number(platformFee) || 0,
        tax_amount: Number(taxAmount) || 0,
        withdraw_fee: Number(withdrawFee) || 0,
        min_withdraw_amount: Number(minWithdrawAmount) || 0,
      };
      await createPricingRules(body).unwrap();
      toast.success("Financial configuration updated successfully!");
    } catch (error) {
      console.error("Failed to update pricing rules:", error);
      toast.error("Failed to update financial configuration.");
    }
  };

  return (
    <div className="p-8 bg-[#F9F9F9] min-h-screen space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Configurations */}
        <div className="lg:col-span-2 space-y-8">
          {/* Financial Configuration */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center gap-3 text-blue-700">
              <DollarSign className="w-5 h-5" />
              <h2 className="text-lg font-bold text-gray-900">Financial Configuration</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Commission Percentage</label>
                <div className="relative">
                  <Input 
                    type="number" 
                    value={platformFee}
                    onChange={(e) => setPlatformFee(e.target.value)}
                    placeholder="15"
                    className="h-12 border-gray-200 focus-visible:ring-blue-600 rounded-lg pr-8 font-bold text-gray-900"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold">%</span>
                </div>
                <p className="text-xs text-gray-600 font-bold">Platform commission on each transaction</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Tax Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold">$</span>
                  <Input 
                    type="number" 
                    value={taxAmount}
                    onChange={(e) => setTaxAmount(e.target.value)}
                    placeholder="9"
                    className="h-12 border-gray-200 focus-visible:ring-blue-600 rounded-lg pl-8 font-bold text-gray-900"
                  />
                </div>
                <p className="text-xs text-gray-600 font-bold">Standard tax amount configuration</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Withdrawal Fee</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold">$</span>
                  <Input 
                    type="number" 
                    value={withdrawFee}
                    onChange={(e) => setWithdrawFee(e.target.value)}
                    placeholder="2.50"
                    className="h-12 border-gray-200 focus-visible:ring-blue-600 rounded-lg pl-8 font-bold text-gray-900"
                  />
                </div>
                <p className="text-xs text-gray-600 font-bold">Fee charged for wallet withdrawals</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Minimum Payout Threshold</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold">$</span>
                  <Input 
                    type="number" 
                    value={minWithdrawAmount}
                    onChange={(e) => setMinWithdrawAmount(e.target.value)}
                    placeholder="50"
                    className="h-12 border-gray-200 focus-visible:ring-blue-600 rounded-lg pl-8 font-bold text-gray-900"
                  />
                </div>
                <p className="text-xs text-gray-600 font-bold">Minimum amount required for withdrawal</p>
              </div>
            </div>
          </div>

          {/* Security & Verification */}
          {/* <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center gap-3 text-green-700">
              <Shield className="w-5 h-5" />
              <h2 className="text-lg font-bold text-gray-900">Security & Verification</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900">KYC Verification</h4>
                  <p className="text-xs text-gray-600 font-bold">Require identity verification for new users</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-xs text-gray-600 font-bold">Require 2FA for admin accounts</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900">Auto-Suspend Risk Accounts</h4>
                  <p className="text-xs text-gray-600 font-bold">Automatically suspend high-risk accounts</p>
                </div>
                <Switch className="data-[state=checked]:bg-blue-600" />
              </div>
            </div>
          </div> */}
        </div>

        {/* Right Column - Content Management & Save */}
        <div className="space-y-8">
          {/* Content Management */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Content Management</h2>
            
            <div className="space-y-4">
              <Link href="/settings/disclaimer?type=faq" className="w-full flex flex-col items-start p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-left group">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-bold text-gray-900">Edit FAQ</span>
                </div>
                <p className="text-xs text-gray-600 font-bold">Manage help articles & FAQs</p>
              </Link>

              <Link href="/settings/disclaimer?type=terms" className="w-full flex flex-col items-start p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-left group">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-bold text-gray-900">Edit Policies</span>
                </div>
                <p className="text-xs text-gray-600 font-bold">Terms, privacy & legal policies</p>
              </Link>

              <Link href="/settings/disclaimer?type=transport" className="w-full flex flex-col items-start p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-left group">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-bold text-gray-900">Edit Transport Disclaimer</span>
                </div>
                <p className="text-xs text-gray-600 font-bold">Transport rules & disclaimer</p>
              </Link>
            </div>
          </div>

          {/* Save Changes */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">Save Changes</h2>
              <p className="text-xs text-gray-700 font-bold leading-relaxed">
                Review your changes before saving. These settings affect the entire platform.
              </p>
            </div>
            
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save All Settings"}
            </button>
          </div>
        </div>

        {/* Discount & Referral Management - Full Column */}
        <div className="lg:col-span-3 bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Discount & Referral Management</h2>
              <p className="text-xs text-gray-600 font-bold mt-0.5">Manage promotional codes, referral programs, and track redemption performance.</p>
            </div>
            <Link
              href="/settings/discount-referral-management"
              className="inline-flex items-center justify-center border border-blue-200 text-blue-700 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all text-center shrink-0"
            >
              Open Management
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/settings/discount-referral-management"
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 shrink-0">
                  <Ticket className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">Manage Discount Codes</p>
                  <p className="text-xs text-gray-600 font-bold">Create and manage promo campaigns</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/settings/discount-referral-management"
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 shrink-0">
                  <Users2 className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">Manage Referral Programs</p>
                  <p className="text-xs text-gray-600 font-bold">Set invites and incentive rewards</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* <Link
              href="/settings/code-usage"
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 shrink-0">
                  <ChartNoAxesCombined className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">Track Code Usage</p>
                  <p className="text-xs text-gray-600 font-bold">Monitor redemptions and performance</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}