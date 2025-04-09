import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	title: z.string().min(1).max(50),
	link: z.string().optional(),
	time: z.number().int().min(1).optional(),
	type: z.enum(["Film", "Series"]),
	season: z.number().int().min(1).optional(),
	episode: z.number().int().min(1).optional(),
});

export default function ContentForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "test",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<div className="w-full bg-card rounded-md p-2">
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="How to Train Your Dragon" {...field} />
								</FormControl>
								<FormDescription>This is your public display name.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</FormProvider>
		</div>
	);
}
