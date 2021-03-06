# android-library

## Installation

`npm install -g https://github.com/kkirby/android-library.git`

## Usage

    usage: android-library [-h] [-v] {create,update} ...

    CLI tool to manage android libraries

    Optional arguments:
      -h, --help       Show this help message and exit.
      -v, --version    Show program's version number and exit.

    command:
      {create,update}
    
    
### Create

    usage: android-library create [-h] -t TARGET -n NAME -k PACKAGE -p PATH [-s SDK]

    Create a library project

    Optional arguments:
      -h, --help            Show this help message and exit.
      -t TARGET, --target TARGET
                            Target ID of the new project, ex: android-21
      -n NAME, --name NAME  Project name
      -k PACKAGE, --package PACKAGE
                            Android package name for the library.
      -p PATH, --path PATH  The new project's directory.
      -s SDK, --sdk SDK     Path to the android-sdk, defaults to env ANDROID_HOME

### Update

    usage: android-library update [-h] -t TARGET -p PATH [-s SDK]

    Updates a library project

    Optional arguments:
      -h, --help            Show this help message and exit.
      -t TARGET, --target TARGET
                            Target ID of the project, ex: android-21
      -p PATH, --path PATH  The project's directory.
      -s SDK, --sdk SDK     Path to the android-sdk, defaults to env ANDROID_HOME

