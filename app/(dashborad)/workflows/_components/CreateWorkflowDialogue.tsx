"use client";

import CustomDialogHeader from '@/components/CustomDialogHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { createWorkflowSchema, createWorkflowSchemaType } from '@/schema/workflow';
import { Layers2Icon, Loader2 } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { createWorkflow } from '@/actions/workflows/createWorkflow';
import { Toast } from '@/components/ui/toast';

function CreateWorkflowDialogue({ triggerText }: { triggerText?: string }) {
  const [open, setOpen] = useState(false);

  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {}
  })

  const { mutate, isPending} = useMutation({
    mutationFn: createWorkflow,
    onSuccess: () => {
      Toast.success("workflow created", {id: "create-workflow"});
    },
    onError: () => {
      Toast.error("failed to create workflow", {id: "create-workflow"});
    },
  })

  const onSubmit = useCallback((values: createWorkflowSchemaType) => {
    toast.loading("creating workfloe...", {id: "create-workflow"});
    mutate(values);
  }, [mutate]);

  return <Dialog open={open} onOpenChange={(open) => {
    form.reset();
    setOpen(open)
  }}>
    <DialogTrigger asChild>
      <Button>{triggerText ?? "create workflow"}</Button>
    </DialogTrigger>
    <DialogContent className='px-0'>
      <CustomDialogHeader
        icon={Layers2Icon}
        title="create workflow"
        subTitle="start building your workflow" 
      />
      <div className='p-6'>
        <Form {...form}>
          <form className='space-y-8 w-full'
          onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex gap-1 items-center'>
                    Name
                    <p className='text-xs text-primary'>(required)</p>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    choose a descriptive and unique name
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex gap-1 items-center'>
                    Description
                    <p className='text-xs text-muted-foreground'>(optional)</p>
                  </FormLabel>
                  <FormControl>
                    <Textarea className='resize-none' {...field} />
                  </FormControl>
                  <FormDescription>
                    provide a brief description of what your workflow does.
                    <br /> This is optional but can help you remember the workflow&apos;s purpose
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full' disabled={isPending}>
              {!isPending && "Proceed"}
              {isPending && <Loader2 className='animate-spin' />}
            </Button>
          </form>
        </Form>
      </div>
    </DialogContent>
  </Dialog>
}

export default CreateWorkflowDialogue