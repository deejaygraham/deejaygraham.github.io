---
title: Having the Right Kind of Argument(s)
tags: [powershell]
thumbnail: "/img/thumbnails/parcel-420x255.webp"

---

I saw a PowerShell script from a few days ago got me thinking about command line arguments and
calling other programs from within a script.

Originally the code was trying to build a command line out of several parameters and hard coded switches
ready to pass to the external application:

### Concatenation

```powershell

$ShellArguments = ' /p=' + $MyArg1 + ' /v' + ' /s' + $MyArg2 + ' ' + $MyArg3

& RunMyProgram.exe $ShellArguments Split(" ")

```

So in this example, we're building a set of command line switches by concatenating text and
variables together to form a single string. Running the program has more belt-and-braces by
making sure that single line of command line text is split into separate chunks and passed to
the application. The obvious downside to this is that building that string is prone to errors,
like missing spaces so arguments run together, the arguments are removed from the context
they are to be used in, plus it's not very easy to read and understand as a whole.

### Individual Args

Least attractive of the solutions is forming arguments individually and passing them all
to the program...

```powershell

$Arg1 = '/p=1234'
$Arg2 = '/v'
$Arg3 = ' /sABC'
$Arg4 = '0xDeadBeef'

& RunMyProgram.exe $Arg1 $Arg2 $Arg3 $Arg4

```

This approach removes the need for separating whitespace but doesn't have much else to
recommend it.

### List

A slightly neater solution I discovered was using a list as a way to collect and order arguments.

```powershell

$ShellArguments = @( "/p=$MyArg1", '/v', "/s=$MyArg2", "$MyArg3" )

& RunMyProgram.exe $ShellArguments

```

PowerShell is clever enough to recognize it's running an external program and has a list, so it
can make sure each argument gets sent to the application correctly. A benefit of this is that
we don't need to worry about surrounding each argument with whitespace so it's a bit easier to see
the order and type of each argument. Still, we have the problem that the arguments and the calling
site are potentially distanced from each other. Fortunately, there turns out to be an even  
better way.

### The PowerShell Way

Neither of the previous two approaches seemed very PowerShell-y, they harked back to a procedural,
string building kind of mentality which is often not the approach of this language.

The "correct" approach, I just discovered, is to let PowerShell work it out by embedding the
arguments directly into the program call as if you were typing them on the command line - no need
for string concatenation or expanding string variables before calling the program.

```powershell

& RunMyProgram.exe /p="$MyArg1" /v /s="$MyArg2" $MyArg3

```

Variable values are expanded correctly, literal values are passed correctly without needing to be
explicitly made string values, the arguments are directly there with the call to the program and, best
of all, it worked first time - which is not what I could have said about the other two approaches.
