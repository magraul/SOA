export class AnimalAddedEvent {
  constructor(public readonly name: string, public readonly age: number) {}

  toString() {
    return JSON.stringify({
      name: this.name,
      age: this.age,
    });
  }
}
