'use client'

import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react";
import *  as actions from '@/actions';
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";

const TopicCreateForm = () => {

    const [formState, action] = useFormState(actions.createTopic, { errors: {} });
    const [isInValid, setIsInValid] = useState({});

    const fields = ['name', 'description'];

    useEffect(() => {
        const newIsInvalid: any = {};
        Object.keys(formState.errors).forEach(key => {
            /* @ts-ignore */
            newIsInvalid[key] = !!formState.errors[key];
        });
        setIsInValid(newIsInvalid);
    }, [formState.errors]);

    const handleCreateTopic = () => setIsInValid({ name: false, description: false});

    return (
        <Popover placement="left" onOpenChange={handleCreateTopic}>
            <PopoverTrigger>
                <Button color="primary">Create a topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a new topic</h3>
                        {fields.map(field => (
                            <div key={field}>
                                <Input
                                    name={field}
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    labelPlacement="outside"
                                    placeholder={`Enter ${field}`}
                                    /* @ts-ignore */
                                    isInvalid={isInValid[field]}
                                    /* @ts-ignore */
                                    errorMessage={formState.errors[field]?.join(', ') || ''}
                                />
                            </div>
                        ))}
                        {formState.errors._form &&
                            <div className="text-sm text-red-500">
                                {formState.errors._form.join(', ')}
                            </div>
                        }
                        <Button type="submit" onClick={handleCreateTopic}>Create</Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
};

export default TopicCreateForm;