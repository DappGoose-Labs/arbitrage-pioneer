import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DonateModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Donate</DialogTitle>
          <DialogDescription>
            Your support helps us maintain and improve this free service. Thank you for your generosity!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Bitcoin (BTC):</h3>
            <p className="text-sm break-all">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
          </div>
          <div>
            <h3 className="font-semibold">Ethereum (ETH):</h3>
            <p className="text-sm break-all">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
          </div>
        </div>
        <Button onClick={onClose} className="mt-4">Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default DonateModal;