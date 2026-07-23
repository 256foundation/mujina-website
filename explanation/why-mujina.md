# Why Mujina

This page is the context behind Mujina: what it is trying to be
and why it is built the way it is.

## Mining should be as open as the rest of Bitcoin 

In almost every part of the Bitcoin stack, open source is the
default. Mining is the exception: from one box in a basement to
the warehouses that hold most of the world's hashrate, nearly all
of it runs on closed firmware. You buy the hardware, the facility,
and the power, then hand the operation to software you have never
read.

A miner picks between two kinds of closed. The manufacturer's
firmware comes with the machine and does what the manufacturer
decided, nothing more. Third-party firmware fills the gap, with
the tuning and features the stock firmware lacks, but it charges a
dev fee: a cut of your hashrate, skimmed by the firmware itself.
The fee is enforced from inside your machine: the firmware phones
home, and it can stop mining when the cut does not get through.

Either way, the software is not yours. You cannot read it, so you
cannot know what it does with your hardware, your pool
credentials, or your network. You cannot change it, so your
machines work the way a vendor chose, for as long as that vendor
chooses.

The fix is not a better vendor. It is firmware you own. Mining
should be as open as the rest of Bitcoin; Mujina is how it gets
there.

## The Linux kernel project of Bitcoin mining

Computing already ran this experiment. Servers and embedded
devices once shipped with vendor operating systems: closed, paid,
and different on every machine. Linux replaced them because a
shared, open kernel let every hardware maker support its own
devices and every user fix their own problems. Rivals in the
marketplace became collaborators in the codebase, each maintaining
the drivers for its own hardware, all of them sharing the core.
Today nobody would build a data center on a vendor's private OS.

Mining is where computing was before Linux. Mujina is the same
move: one open codebase for every vendor's hardware. The
scheduler, pool protocols, API, and monitoring are written once;
each hashboard adds a driver, usually written by the people who
own that hardware. For an operator with mixed machines, that is
one system to learn; expertise carries from machine to machine.

## Why support lives in forks

The [compatibility matrix](/reference/hardware-compatibility) shows
some boards supported in mainline and some in forks. This is not
disarray; it is how hardware support gets built. Bringing up a board
means experiments that may brick hardware, rapid iteration that
mainline review would slow, and code that stabilizes only once the
hardware is understood. Forks are where that work can move fast;
mainline is where it merges once it settles.

## The foundation behind it

Mujina is a project of the [256 Foundation][foundation], which
builds open tools for Bitcoin mining across the whole stack. Its
sister projects sit one layer down, in hardware: the
[EmberOne/00][emberone] open hashboard and the [Libreboard][libreboard]
open control board are designed from the start to run open
firmware, with no reverse engineering required.

[foundation]: https://256foundation.org
[emberone]: https://github.com/256foundation/emberone00-pcb
[libreboard]: https://github.com/256foundation/libreboard

## Why the GPL

Mujina is licensed GPL-3.0-or-later. The license makes the
ownership promise enforceable: anyone may read, run, and modify the
software, and anyone who distributes a modified version must pass
the same rights to its users.

The same rights make you independent. Anyone with the expertise
can maintain, tune, or extend the firmware, so you are not bound
to one vendor's team, its prices, or its survival. An open
codebase also outlives its founders: what the community builds
stays available to build on.
