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
import { useRouter } from 'next/navigation';

export function DeleteServerModal() {
  const { isOpen, onClose, type, data } = useModal();

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === 'deleteServer';
  const { server } = data;

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);

      onClose();
      router.refresh();
      router.push("/")
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
            Apagar servidor
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Você tem certeza que deseja apagar{" "}
            <span className='font-semibold text-indigo-500'>
              {server?.name}?
              <br />
            </span>Essa ação não pode ser desfeita.
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