export type EntityProps<T> = { id: string } & T;

export abstract class Entity<T> {
  constructor(private props: EntityProps<T>) {}

  get id() {
    return this.props.id;
  }

  get propsCopy() {
    return { ...this.props };
  }
}
