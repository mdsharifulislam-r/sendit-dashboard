"use client";

import React from 'react';
import Link from "next/link";
import { DollarSign, Shield, ChevronRight, Ticket, Users2, ChartNoAxesCombined } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
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
                    type="text" 
                    defaultValue="15"
                    className="h-12 border-gray-200 focus-visible:ring-blue-600 rounded-lg pr-8 font-bold text-gray-900"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold">%</span>
                </div>
                <p className="text-xs text-gray-600 font-bold">Platform commission on each transaction</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Withdrawal Fee</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold">$</span>
                  <Input 
                    type="text" 
                    defaultValue="2.50"
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
                    type="text" 
                    defaultValue="50"
                    className="h-12 border-gray-200 focus-visible:ring-blue-600 rounded-lg pl-8 font-bold text-gray-900"
                  />
                </div>
                <p className="text-xs text-gray-600 font-bold">Minimum amount required for withdrawal</p>
              </div>
            </div>
          </div>

          {/* Security & Verification */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-8">
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
          </div>
        </div>

        {/* Right Column - Content Management & Save */}
        <div className="space-y-8">
          {/* Content Management */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Content Management</h2>
            
            <div className="space-y-4">
              <button className="w-full flex flex-col items-start p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-left group">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-bold text-gray-900">Edit FAQ</span>
                </div>
                <p className="text-xs text-gray-600 font-bold">Manage help articles</p>
              </button>

              <button className="w-full flex flex-col items-start p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-left group">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-bold text-gray-900">Edit Policies</span>
                </div>
                <p className="text-xs text-gray-600 font-bold">Terms & conditions</p>
              </button>

              <button className="w-full flex flex-col items-start p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-left group">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-bold text-gray-900">Edit Help Content</span>
                </div>
                <p className="text-xs text-gray-600 font-bold">Support documentation</p>
              </button>
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
            
            <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2">
              Save All Settings
            </button>
          </div>

          {/* Discount & Referral Management */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Discount & Referral Management</h2>

            <div className="space-y-3">
              <Link
                href="/settings/discount-referral-management"
                className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                    <Ticket className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Manage Discount Codes</p>
                    <p className="text-xs text-gray-600 font-bold">Create and manage promo campaigns</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link
                href="/settings/discount-referral-management"
                className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
                    <Users2 className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Manage Referral Programs</p>
                    <p className="text-xs text-gray-600 font-bold">Set invites and incentive rewards</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link
                href="/settings/code-usage"
                className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                    <ChartNoAxesCombined className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Track Code Usage</p>
                    <p className="text-xs text-gray-600 font-bold">Monitor redemptions and performance</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>

            <Link
              href="/settings/discount-referral-management"
              className="block w-full border border-blue-200 text-blue-700 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all text-center"
            >
              Open Management
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}