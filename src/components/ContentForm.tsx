import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addContent, editContent } from "@/firebase/firestore";
import { Content } from "@/types";
import { WithId } from "@/util/types";
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
		season: z.string().optional(),
		episode: z.string().optional(),
	})
	.superRefine((vals, ctx) => {
		if (vals.type === "series") {
			// Season error handling
			if (!vals.season)
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Season is required",
					path: ["season"],
				});
			else {
				const seasonNum = Number(vals.season);
				if (Number.isNaN(seasonNum) || !Number.isInteger(seasonNum)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: "Season must be a number",
						path: ["season"],
					});
				} else if (seasonNum <= 0) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: "Must be at least 1",
						path: ["season"],
					});
				}
			}

			// Episode error handling
			if (!vals.episode)
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Episode is required",
					path: ["episode"],
				});
			else {
				const episodeNum = Number(vals.episode);
				if (Number.isNaN(episodeNum) || !Number.isInteger(episodeNum)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: "Episode must be a number",
						path: ["episode"],
					});
				} else if (episodeNum <= 0) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: "Must be at least 1",
						path: ["Episode"],
					});
				}
			}
		}
	});

export default function ContentForm({
	content,
	close,
}: {
	content?: WithId<Content>;
	close: (submitted: boolean) => void;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: content
			? {
					title: content.title,
					type: content.type,
					link: content.link,
					episode: content.type === "series" ? content.episode.toString() : undefined,
					season: content.type === "series" ? content.season.toString() : undefined,
			  }
			: {
					type: "film",
					episode: (1).toString(),
					season: (1).toString(),
			  },
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const newContent: Content = {
			title: values.title,
			type: values.type,
			...(values.link && { link: values.link }),
			...(values.time && { time: values.time }),
			...(values.type === "series" && {
				episode: Number(values.episode!),
				season: Number(values.season!),
			}),
		} as Content;

		if (content) {
			editContent({ id: content.id, ...newContent });
		} else {
			addContent(newContent);
		}

		close(true);
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
						<Button type="button" variant="outline" onClick={() => close(false)}>
							Cancel
						</Button>
						<Button type="submit">Submit</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
}
