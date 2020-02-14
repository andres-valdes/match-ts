# match-ts

match-ts is a cute pattern matcher that you can use when you want your code to be super cool and chained.

Get rid of those nasty if-else blocks and start matching!

examples

```ts
import match from 'match-ts';

const greet = (name?: string) =>
  match(name)
    .on(name === 'Carlos', `I'm not saying hi to you >:(`)
    .on(name != null, `hey ${name} how are you :)`)
    .otherwise('hey there friend');

const greetWithFunctionInputs = (name?: string) =>
  match(name)
    .on(n => n === 'Carlos', `I'm not saying hi to you >:(`)
    .on(
      n => n != null,
      n => `hey ${n} how are you :)`
    )
    .otherwise(n => 'hey there friend');

greet('Carlos'); // "I'm not saying hi to you >:("
greetWithFunctionInputs('David'); // "hey David how are you :)"
```

Never break a beautiful chain for some lame imperative logic ever again!
