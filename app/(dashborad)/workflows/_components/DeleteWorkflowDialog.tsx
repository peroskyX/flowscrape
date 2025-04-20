"use client";

import { DeleteWorkflow } from "@/actions/workflows/deleteWorkflow";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Workflow } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  WorkflowName: string
  workflowId: string
}

function DeleteWorkflowDialog({open, setOpen, WorkflowName, workflowId}: Props) {
  const [confirmText, setConfirmText] = useState("");
  const deleteMutation = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted successfully", {id: workflowId});
      setConfirmText("")
    },
    onError: () => {
      toast.error("something went wrong", {id: workflowId});
    }
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen} >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            if you delete this workflow tou will not be able to recover it.
            <div className="flex flex-col py-4 gap-2">
              <p>
                if you are sure, enter <b>{WorkflowName}</b> to confirm:
              </p>
              <Input 
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")} >Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== WorkflowName || deleteMutation.isPaused}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => {
              toast.loading("deleting workflow...", { id: workflowId });
              deleteMutation.mutate(workflowId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteWorkflowDialog