import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/hooks/try-catch";
import {  lessonSchema, lessonSchemaType } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogContent } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createLesson } from "../actions";
import { toast } from "sonner";

export  function NewLessonModal({courseId,chapterId} :{courseId:string,chapterId:string}) {
    const [isOpen,setIsOpen] = useState(false);
    const [Pending,startTransition] = useTransition()
     const form = useForm<lessonSchemaType>({
        resolver: zodResolver(lessonSchema),
        defaultValues: {
          name: "",
          courseId: courseId,
          chapterId:chapterId,

        },
      });

 async function onSubmit(values:lessonSchemaType) {
    console.log("Form submitted with values:", values);
    startTransition(async () => {
        console.log("Starting transition...");
        const {data:result,error} = await tryCatch(createLesson(values));
        console.log("Result:", result, "Error:", error);
        if (error){
            toast.error("AN unexpected error happened. Please try again");
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
        if(!open){
            form.reset();
        }
        setIsOpen(open)
    }
    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-center gap-1">
                    <Plus className="size-4" />New Lesson

                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>
                        Create a New Lesson
                        </DialogTitle>
                    <DialogDescription>
                        what would you like to name your Lesson?
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} name="name" render={({field
                    })=> (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl><Input placeholder="Lesson Name" {...field}/></FormControl>
                            <FormMessage/>

                        </FormItem>
                    )}/>
                    <DialogFooter>
          <Button
    type="button"
    disabled={Pending}
    onClick={(e) => {
        e.preventDefault();
        form.handleSubmit(onSubmit)();
    }}
>
    {Pending ? 'Saving...':"Save Change"}
</Button>




                    </DialogFooter>
                    </form>

                </Form>


            </DialogContent>

        </Dialog>
    )
}