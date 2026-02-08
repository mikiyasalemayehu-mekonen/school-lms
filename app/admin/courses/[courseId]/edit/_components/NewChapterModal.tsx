import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/hooks/try-catch";
import { chapterSchema, chapterSchemaType } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogContent } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createChapter } from "../actions";
import { toast } from "sonner";

export  function NewChapter({courseId} :{courseId:string}) {
    const [isOpen,setIsOpen] = useState(false);
    const [Pending,startTransition] = useTransition()
     const form = useForm<chapterSchemaType>({
        resolver: zodResolver(chapterSchema),
        defaultValues: {
          name: "",
          courseId: courseId,
        },
      });

    async function onSubmit(values:chapterSchemaType) {
        startTransition(async () => {
            const {data:result,error} = await tryCatch(createChapter(values));
            if (!error){
                toast.error("AN unecpected error happend. Please try again");
                return
            }
            if(result.status === "success"){
                toast.success(result.message);
                form.reset();
                setIsOpen(false);
            }
            else if(result.status === "error") {
                toast.error(result.message);
            }

        })
    }
    function handleOpenChange(open:boolean) {
        setIsOpen(open)
    }
    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="size-4" />New Chapter

                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>
                        Create a New chapter
                        </DialogTitle>
                    <DialogDescription>
                        what would you like to name your chapter?
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} name="name" render={({field
                    })=> (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl><Input placeholder="Chapter Name" {...field}/></FormControl>
                            <FormMessage/>

                        </FormItem>
                    )}/>
                    <DialogFooter>
                        <Button type="submit" disabled={Pending}>
                        {Pending ? 'Saving...':"Save Change"}

                        </Button>

                    </DialogFooter>

                </form>


            </DialogContent>

        </Dialog>
    )
}