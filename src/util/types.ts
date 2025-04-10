export type WithId<T> = T & { id: string };

export type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;
