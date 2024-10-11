import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DonateModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-charcoal text-white border border-limeGreen">
        <DialogHeader>
          <DialogTitle className="text-limeGreen text-2xl font-heading">Donate</DialogTitle>
          <DialogDescription className="text-lightGrey">
            Your support helps us maintain and improve this free service. Thank you for your generosity!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-limeGreen">Bitcoin (BTC):</h3>
            <p className="text-sm break-all text-white">bc1qtnm5n7ewj6hkz7ar6gg8xma726pea5pe95atkm</p>
          </div>
          <div>
            <h3 className="font-semibold text-limeGreen">Ethereum (ETH) / ERC-20 (EVM):</h3>
            <p className="text-sm break-all text-white">0x18C6A47AcA1c6a237e53eD2fc3a8fB392c97169b</p>
          </div>
        </div>
        <Button onClick={onClose} className="mt-4 bg-black text-limeGreen border border-limeGreen hover:bg-limeGreen hover:text-black transition-colors">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DonateModal;