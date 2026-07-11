// "use client";

// import type React from "react";

// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// interface CreatePromotionModalProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// export function CreatePromotionModal({ isOpen, onClose }: CreatePromotionModalProps) {
//     const [formData, setFormData] = useState({
//         promotionCode: "",
//         discountType: "percentage",
//         percentage: "",
//         validUntil: "",
//         usageLimit: "",
//     });

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleSelectChange = (value: string) => {
//         setFormData((prev) => ({
//             ...prev,
//             discountType: value,
//         }));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log("Form submitted:", formData);
//         onClose();
//     };

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent className="max-w-lg">
//                 <DialogHeader>
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <DialogTitle>Create New Promotion</DialogTitle>
//                             <p className="text-sm text-muted-foreground mt-1">Set up a discount code for your event attendees</p>
//                         </div>
//                     </div>
//                 </DialogHeader>

//                 <form onSubmit={handleSubmit} className="space-y-4 py-4">
//                     {/* Promotion Code */}
//                     <div className="space-y-2">
//                         <Label htmlFor="promotionCode" className="text-sm font-medium">
//                             Promotion Code <span className="text-destructive">*</span>
//                         </Label>
//                         <Input id="promotionCode" name="promotionCode" placeholder="e.g., SUMMER25" value={formData.promotionCode} onChange={handleInputChange} className="border-2 border-input focus:border-ring" />
//                     </div>

//                     {/* Discount Type and Percentage */}
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <Label htmlFor="discountType" className="text-sm font-medium">
//                                 Discount Type <span className="text-destructive">*</span>
//                             </Label>
//                             <Select value={formData.discountType} onValueChange={handleSelectChange}>
//                                 <SelectTrigger className="border-2 border-input focus:border-ring w-full">
//                                     <SelectValue />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="percentage">Percentage</SelectItem>
//                                     <SelectItem value="fixed">Fixed Amount</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>

//                         <div className="space-y-2">
//                             <Label htmlFor="percentage" className="text-sm font-medium">
//                                 Percentage (%) <span className="text-destructive">*</span>
//                             </Label>
//                             <Input id="percentage" name="percentage" type="number" placeholder="0" value={formData.percentage} onChange={handleInputChange} className="border-2 border-input focus:border-ring" />
//                         </div>
//                     </div>

//                     {/* Valid Until and Usage Limit */}
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <Label htmlFor="validUntil" className="text-sm font-medium">
//                                 Valid Until <span className="text-destructive">*</span>
//                             </Label>
//                             <Input id="validUntil" name="validUntil" type="date" value={formData.validUntil} onChange={handleInputChange} className="border-2 border-input focus:border-ring" />
//                         </div>

//                         <div className="space-y-2">
//                             <Label htmlFor="usageLimit" className="text-sm font-medium">
//                                 Usage Limit <span className="text-destructive">*</span>
//                             </Label>
//                             <Input id="usageLimit" name="usageLimit" type="number" placeholder="100" value={formData.usageLimit} onChange={handleInputChange} className="border-2 border-input focus:border-ring" />
//                         </div>
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex justify-end gap-3 pt-4">
//                         <Button type="button" variant="outline" onClick={onClose} className="px-6 bg-transparent">
//                             Cancel
//                         </Button>
//                         <Button type="submit" className="bg-primary text-primary-foreground px-6">
//                             Create Promotion
//                         </Button>
//                     </div>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// }

"use client";

import type React from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreatePromotionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export function CreatePromotionModal({ isOpen, onClose, onSubmit }: CreatePromotionModalProps) {
    const [formData, setFormData] = useState({
        promotionCode: "",
        discountType: "percentage",
        percentage: "",
        validUntil: "",
        usageLimit: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            discountType: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle>Create New Promotion</DialogTitle>
                            <p className="text-sm text-muted-foreground mt-1">Set up a discount code for your event attendees</p>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    {/* Promotion Code */}
                    <div className="space-y-2">
                        <Label htmlFor="promotionCode" className="text-sm font-medium">
                            Promotion Code <span className="text-destructive">*</span>
                        </Label>
                        <Input id="promotionCode" name="promotionCode" placeholder="e.g., SUMMER25" value={formData.promotionCode} onChange={handleInputChange} className="border-2 border-input focus:border-ring" required />
                    </div>

                    {/* Discount Type and Percentage */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="discountType" className="text-sm font-medium">
                                Discount Type <span className="text-destructive">*</span>
                            </Label>
                            <Select value={formData.discountType} onValueChange={handleSelectChange}>
                                <SelectTrigger className="border-2 border-input focus:border-ring w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="percentage">Percentage</SelectItem>
                                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="percentage" className="text-sm font-medium">
                                {formData.discountType === "percentage" ? "Percentage (%)" : "Amount ($)"} <span className="text-destructive">*</span>
                            </Label>
                            <Input id="percentage" name="percentage" type="number" placeholder={formData.discountType === "percentage" ? "0" : "0.00"} value={formData.percentage} onChange={handleInputChange} className="border-2 border-input focus:border-ring" required min="0" step={formData.discountType === "percentage" ? "1" : "0.01"} />
                        </div>
                    </div>

                    {/* Valid Until and Usage Limit */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="validUntil" className="text-sm font-medium">
                                Valid Until <span className="text-destructive">*</span>
                            </Label>
                            <Input id="validUntil" name="validUntil" type="date" value={formData.validUntil} onChange={handleInputChange} className="border-2 border-input focus:border-ring" required min={new Date().toISOString().split("T")[0]} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="usageLimit" className="text-sm font-medium">
                                Usage Limit <span className="text-destructive">*</span>
                            </Label>
                            <Input id="usageLimit" name="usageLimit" type="number" placeholder="100" value={formData.usageLimit} onChange={handleInputChange} className="border-2 border-input focus:border-ring" required min="1" />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onClose} className="px-6 bg-transparent">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-primary text-primary-foreground px-6">
                            Create Promotion
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
