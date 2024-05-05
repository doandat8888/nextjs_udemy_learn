'use server';

import { auth } from "@/auth";
import { z } from "zod";

interface CreateTopicFormState {
    errors: {
        name?: string[],
        description?: string[],
        _form?: string[]
    }
}

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/[a-z-]+$/, {
        message: 'Must be a lowercase letter or dashes without spaces'
    }),
    description: z.string().min(10)
})

export async function createTopic(formState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState>{
    console.log("result", formData.get('name'), formData.get('description'))
    const result = createTopicSchema.safeParse({
        name: formData.get('name') as string,
        description: formData.get('description') as string,
    });
    if(!result.success) {
        console.log(result.error.flatten().fieldErrors);
        return {
            errors: result.error.flatten().fieldErrors
        } 
    }

    const session = await auth();
    if(!session || !session?.user) {
        return {
            errors: {
                _form: ['You have to sign in to do this']
            }
        }
    }
    //TODO: revalidate (trigger to re-render) homepage
    return { 
        errors: {} 
    };
};