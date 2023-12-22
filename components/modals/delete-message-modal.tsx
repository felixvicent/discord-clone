"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal-store';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import qs from 'query-string';

export function DeleteMessageModal() {
  const { isOpen, onClose, type, data } = useModal();

  const { apiUrl, query } = data;

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === 'deleteMessage';

  const onClick = async () => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query
      });

      setIsLoading(true);

      await axios.delete(url);

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Apagar mensagem
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Você tem certeza que deseja apagar a mensagem
            <br />
            Essa ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='bg-gray-100 px-6 py-4'>
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancelar
            </Button>
            <Button disabled={isLoading} onClick={onClick} variant="primary">
              Confirmar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};