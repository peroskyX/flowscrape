"use client";

import { Card } from "@/components/ui/card";
import { WorkflowStatus } from "@/types/workflow";
import { Workflow } from "@prisma/client";

function WorkflowCard({ workflow}: {workflow: Workflow} ) {
  const isDraft = workflow.status == WorkflowStatus.DRAFT
  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden
    hover:sha" >

    </Card>
  )
}

export default WorkflowCard