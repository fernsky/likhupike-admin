"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  parentId: z.string().min(1, "Parent ID is required"),
  wardNo: z.coerce.number().min(1, "Ward number is required"),
});

export default function EditIndividual({ params }: { params: { id: string } }) {
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id);

  const { data: individual, isLoading } = api.individual.getById.useQuery({
    id: decodedId,
  });

  const updateMutation = api.individual.updateBasicInfo.useMutation({
    onSuccess: () => {
      router.push(`/individual/${decodedId}`);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: individual?.name ?? "",
      parentId: individual?.parentId ?? "",
      wardNo: individual?.wardNo ?? 1,
    },
  });

  if (isLoading) {
    return (
      <ContentLayout title="Edit Family">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[200px] rounded-lg" />
          ))}
        </div>
      </ContentLayout>
    );
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    updateMutation.mutate({
      id: decodedId,
      ...data,
    });
  };

  return (
    <ContentLayout
      title="Edit Individual"
      subtitle={`ID: ${decodedId}`}
      actions={
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/families/${decodedId}`)}
            className="hover:border-destructive hover:text-destructive"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="individual-form"
            className="bg-primary hover:bg-primary/90"
          >
            Save Changes
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <Form {...form}>
          <form
            id="individual-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wardNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ward Number</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </ContentLayout>
  );
}
