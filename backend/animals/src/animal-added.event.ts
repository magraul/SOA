export class AnimalAddedEvent {
  constructor(
    public readonly name: string,
    public readonly age: number,
    public readonly type: string,
  ) {}
}
