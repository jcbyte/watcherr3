import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
	.object({
		title: z
			.string()
			.min(1, { message: "Title is required" })
			.max(50, { message: "Title must be less than 50 characters" }),
		link: z.string().optional(),
		time: z.number().int().min(1, { message: "Must be at least 1" }).optional(),
		type: z.enum(["film", "series"], { message: "Type is required" }),
		season: z.number().int().min(1, { message: "Must be at least 1" }).optional(),
		episode: z.number().int().min(1, { message: "Must be at least 1" }).optional(),
	})
	.superRefine((vals, ctx) => {
		if (vals.type === "series") {
			if (vals.season === undefined)
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Season is required.",
					path: ["season"],
				});
			if (vals.episode === undefined)
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Episode is required.",
					path: ["episode"],
				});
		}
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
		<div className="w-full bg-card rounded-md p-4">
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="How to Train Your Dragon" autoComplete="off" {...field} className="border-none" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem className="space-y-3">
								<FormLabel>Type</FormLabel>
								<FormControl>
									<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
										<FormItem className="flex items-center">
											<FormControl>
												<RadioGroupItem value="film" />
											</FormControl>
											<FormLabel className="font-normal">Film</FormLabel>
										</FormItem>
										<FormItem className="flex items-center">
											<FormControl>
												<RadioGroupItem value="series" />
											</FormControl>
											<FormLabel className="font-normal">Series</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="link"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Link</FormLabel>
								<FormControl>
									<Input
										placeholder="https://www.netflix.com/gb/title/80174608"
										autoComplete="off"
										{...field}
										className="border-none"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{form.getValues("type") === "series" && (
						<div className="flex gap-2">
							<FormField
								control={form.control}
								name="season"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Season</FormLabel>
										<FormControl>
											<Input type="number" min={1} step={1} autoComplete="off" {...field} className="border-none" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="episode"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Episode</FormLabel>
										<FormControl>
											<Input type="number" min={1} step={1} autoComplete="off" {...field} className="border-none" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					)}

					<div className="flex gap-2 place-self-end">
						<Button type="button" variant="outline">
							Cancel
						</Button>
						<Button type="submit">Submit</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
}
