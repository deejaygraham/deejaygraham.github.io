Task MyFirstTask -Depends CleanStuff, CopyStuff {


}

Task CopyStuff -Depends CleanStuff {


}

Task CleanStuff {


}
