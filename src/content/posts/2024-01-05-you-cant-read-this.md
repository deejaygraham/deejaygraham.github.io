---
permalink: 2024/01/05/you-cant-read-this/
layout: post
title: You Cant Read This

tags: [csharp, javascript, code]
---

Of course, you can. This is plain text. What I was playing with recently was a means to take ordinary, everyday
JSON text and tweak it slightly so that it becomes a little harder to read for anyone casually "snooping" or
hoping to copy the homework of someone else by copying and pasting their JSON.

To anyone technically competent who wanted to spend a little time, it wasn't going to be impossible. I wasn't going for
impossible or I would have gravitated more towards encryption. Encryption is the obvious answer but whatever I came up with
had to be obfuscasted at the server in C# code and de-obfuscated/read at the browser in JavaScript. Again, because the JSON
has to be read by code in the browser, encryption was an awkward option and it didn't need to be super secure, there were
no bank details or PII involved here.

### Server

Here's what I came up with. C# code to obfuscate as a two part process. First, minify the, presumably, multi-line JSON into
a single line and remove all whitespace. This probably has most effect in terms of making it difficult to read. The JSON
schema I was thinking of was best understood with lots of whitespace. Second, to optionally base 64 encode the minified text
to pretend "encrypt" it.

```csharp

internal class Obfuscator
{
private readonly Encoding \_encoding = System.Text.Encoding.UTF8;

    public string Obfuscate(string plainTextJson, bool encode = false)
    {
        string minified = Minify(plainTextJson);

        if (encode)
        {
            return Base64Encode(minified);
        }

        return minified;
    }

    public string DeObfuscate(string obfuscated)
    {
        // is this plain text ?
        if (obfuscated.Contains("{")) return obfuscated;

        string plainText = Base64Decode(obfuscated);

        return plainText;
    }

    private string Minify(string json)
    {
        if (String.IsNullOrEmpty(json)) return string.Empty;

        var obj = JsonConvert.DeserializeObject(json);
        return JsonConvert.SerializeObject(obj, Formatting.None);
    }

    private string Base64Encode(string text)
    {
        return Convert.ToBase64String(_encoding.GetBytes(text));
    }

    private string Base64Decode(string base64)
    {
        var bytes = System.Convert.FromBase64String(base64);
        return _encoding.GetString(bytes);
    }

}

```

Note that the text doesn't have to be just ascii format, here it's treated as utf-8. This is not normally a concern
when just dealing in .Net but becomes an important wrinkle when we are working "cross-platform" on the server and
browser environments.

### Tests

We need tests to make sure the minification and encoding work as expected and can be round-tripped.

```csharp

    [TestFixture]
    public class ObfuscatorTests
    {
        private Obfuscator _obfuscator;

        [SetUp]
        public void SetUp()
        {
            _obfuscator = new Obfuscator();
        }

        [Test]
        public void Empty_Script_Is_Unchanged()
        {
            Assert.That(_obfuscator.Obfuscate(string.Empty), Is.EqualTo(string.Empty));
        }

        [Test]
        public void Extra_Whitespace_Is_Removed()
        {
            string json = " { \t hello: \"world\"     } \t\t\t       ";
            string o = _obfuscator.Obfuscate(json);

            Assert.That(o.Length, Is.LessThan(json.Length));
            Assert.That(o.Count(c => Char.IsWhiteSpace(c)), Is.Zero);
        }

        [Test]
        public void Line_Breaks_Are_Removed()
        {
            string json = "{ \r\n hello: \r\n \"world\" \r\n}";
            string o = _obfuscator.Obfuscate(json);

            Assert.That(o.Length, Is.LessThan(json.Length));
            Assert.That(o.Count(c => c == '\r' || c == '\n'), Is.Zero);
        }

        [Test]
        public void Whitespace_In_Text_Is_Preserved()
        {
            string json = "{\"greeting message with spaces\":\"hello world this string has spaces in it\"}";
            string o = _obfuscator.Obfuscate(json);

            Assert.That(o.Length, Is.EqualTo(json.Length));
            Assert.That(o.Count(c => Char.IsWhiteSpace(c)), Is.EqualTo(json.Count(c => Char.IsWhiteSpace(c))));
        }

        [Test]
        public void Base64_Encoded_Text_Is_Recoverable()
        {
            string json = "{\"greeting message with spaces\":\"hello world this string has spaces in it\"}";
            string o = _obfuscator.Obfuscate(json, true);

            string roundTrip = _obfuscator.DeObfuscate(o);

            Assert.That(roundTrip.Length, Is.EqualTo(json.Length));
            Assert.That(roundTrip, Is.EqualTo(json));
        }
    }

```

### Client

Thanks to MDN saving the day again, I found an [article](https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem) that showed how to handle utf-8
encoding not just ascii text.

```javascript

/\*\*

- Decodes base-64 encoded utf-8 text into plain json.
- Any exception thrown will return the original text.
- @param {text} json content
  \*/
  export const decodeScript = (text) => {

if (text.includes('{')) return text;

try {

    const binaryString = atob(text);
    const bytes = Uint8Array.from(binaryString, (m) => m.codePointAt(0));

    return new TextDecoder().decode(bytes);

} catch(e) {
return text;
}
}

```

### Tests

```javascript

import { decodeScript } from '../scriptDecoder';
import { TextEncoder, TextDecoder } from 'util';

// patch because jsdom doesn't support text decoder
Object.assign(global, { TextDecoder });

describe('Protected Content', () => {

const plainTextScript = '{"version":"1.5","todo":"alert(\'hello world\')"}';
const utf8EncodedScript = 'eyJ2ZXJzaW9uIjoiMS41IiwidG9kbyI6ImFsZXJ0KCdoZWxsbyB3b3JsZCcpIn0=';

it('Empty text content is unchanged.', () => {
expect(decodeScript('')).toBe('');
});

it('Plain text json content is unchanged.', () => {
expect(decodeScript(plainTextScript)).toBe(plainTextScript);
});

it('Encoded UTF8 text is decoded.', () => {
expect(decodeScript(utf8EncodedScript)).toBe(plainTextScript);
});
});

```

### Refactor

Once I'd got this working I refactored to make it slightly easier to understand (for me anyway).

Started with an interface to apply a modification to the text and also, if possible, undo it.

```csharp

interface IModifyJson
{
string Do(string s);
string Undo(string s);
}

```

Which means we can make a more general version of the Obfuscator class which looks
a bit simpler and pushes the implementation of each step into a separate class.

```csharp

internal class Obfuscator
{
private List<IModifyJson> \_process = new List<IModifyJson>
{
new TextMinifier(),
new Base64Encoder()
};

    public string Obfuscate(string plainTextJson)
    {
        string obfuscated = plainTextJson;

        foreach(var modifier in _process)
        {
            obfuscated = modifier.Do(obfuscated);
        }

        return obfuscated;
    }

    public string DeObfuscate(string obfuscated)
    {
        string undone = obfuscated;

        for (int i = _process.Count - 1; i >= 0; i--)
        {
            undone = _process[i].Undo(undone);
        }

        return undone;
    }

}

```

The minifier is nice and small, although the undo didn't seem to be useful so is
effectively a no-op.

```csharp

class TextMinifier : IModifyJson
{
public string Undo(string s)
{
// can't be undone usefully
return s;
}

    public string Do(string s)
    {
        if (String.IsNullOrEmpty(s)) return string.Empty;

        var obj = JsonConvert.DeserializeObject(s);
        return JsonConvert.SerializeObject(obj, Formatting.None);
    }

}

```

And in a similar way, the encoding is nice and self contained

```csharp

class Base64Encoder : IModifyJson
{
private readonly Encoding \_encoding = System.Text.Encoding.UTF8;

    public string Undo(string s)
    {
        if (s.Contains("{")) return s;

        var bytes = System.Convert.FromBase64String(s);
        return _encoding.GetString(bytes);
    }

    public string Do(string s)
    {
        return Convert.ToBase64String(_encoding.GetBytes(s));
    }

}

```

This approach perhaps smells a little over-engineered but at the moment I'm not sure
how far to take the obfuscation so having a list of steps means they can be added, removed
and mixed around just by changing the order in the list.
