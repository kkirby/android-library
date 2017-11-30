#!/usr/bin/env node

var Mustache = require('mustache');
var AdmZip = require('adm-zip');
var path = require('path');
var shell = require('shelljs')
var fs = require('fs');
let ArgumentParser = require('argparse').ArgumentParser;

var argumentParser = new ArgumentParser({
	version: '0.0.1',
	addHelp: true,
	description: 'CLI tool to manage android libraries'
});

var subArgumentParsers = argumentParser.addSubparsers({
	title:'command',
	dest: 'command'
});

var create = subArgumentParsers.addParser('create',{
	addHelp: true,
	description: 'Create a library project'
});

var update = subArgumentParsers.addParser('update',{
	addHelp: true,
	description: 'Updates a library project'
});

update.addArgument(
	['-t','--target'],
	{
		required: true,
		action: 'store',
		help: 'Target ID of the project, ex: android-21',
		dest: 'target'
	}
);

update.addArgument(
	['-p','--path'],
	{
		required: true,
		action: 'store',
		help: 'The project\'s directory.',
		dest: 'path'
	}
);

update.addArgument(
	['-s','--sdk'],
	{
		required: !!!process.env['ANDROID_HOME'],
		action: 'store',
		help: 'Path to the android-sdk, defaults to env ANDROID_HOME',
		defaultValue: process.env['ANDROID_HOME'],
		dest: 'sdk'
	}
);

create.addArgument(
	['-t','--target'],
	{
		required: true,
		action: 'store',
		help: 'Target ID of the new project, ex: android-21',
		dest: 'target'
	}
);

create.addArgument(
	['-n','--name'],
	{
		required: true,
		action: 'store',
		help: 'Project name',
		dest: 'name'
	}
);

create.addArgument(
	['-k','--package'],
	{
		required: true,
		action: 'store',
		help: 'Android package name for the library.',
		dest: 'package'
	}
);

create.addArgument(
	['-p','--path'],
	{
		required: true,
		action: 'store',
		help: 'The new project\'s directory.',
		dest: 'path'
	}
);

create.addArgument(
	['-s','--sdk'],
	{
		required: !!!process.env['ANDROID_HOME'],
		action: 'store',
		help: 'Path to the android-sdk, defaults to env ANDROID_HOME',
		defaultValue: process.env['ANDROID_HOME'],
		dest: 'sdk'
	}
);

var args = argumentParser.parseArgs();

if(args.command == 'create'){
	var archive = new AdmZip(path.join(__dirname,'lib_project.zip'));
	archive.extractAllTo(args.path);

	shell.find(args.path).filter(
		function(item){
			return item.match(/\.(?!png)[a-z]+$/);
		}
	).map(
		function(item){
			let contents = fs.readFileSync(item);
			if(contents.indexOf('{{') !== -1){
				contents = Mustache.render(
					contents.toString(),
					{
						packageName: args.package,
						name: args.name,
						target: args.target,
						sdkDir: args.sdk
					}
				);
				fs.writeFileSync(item,contents);
			}
		}
	);
	
	console.log('Created');
}
else if(args.command == 'update'){
	let localPropertiesPath = path.join(
		args.path,
		'local.properties'
	);
	
	let localProperties = fs.readFileSync(localPropertiesPath);
	
	localProperties = localProperties.toString().replace(
		/^sdk\.dir\s*=.*$/m,
		'sdk.dir=' + args.sdk
	);
	
	fs.writeFileSync(localPropertiesPath,localProperties);
	
	///
	
	let projectPropertiesPath = path.join(
		args.path,
		'project.properties'
	);
	
	let projectProperties = fs.readFileSync(projectPropertiesPath);
	
	projectProperties = projectProperties.toString().replace(
		/^target\s*=.*$/m,
		'target=' + args.target
	);
	
	fs.writeFileSync(projectPropertiesPath,projectProperties);
	
	console.log('Updated');
}