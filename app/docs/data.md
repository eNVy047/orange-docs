# Page: getting-started
author: Narayan Verma
lastUpdated: feb 8, 2026
---

# Getting Started

Reading the docs is a great way to learn. Whether it’s a new technology, programming language, or framework, delving into the docs helps you gain in-depth knowledge and insights.

We have designed this website so that you can develop the habit to read from the docs. In future, our attempt is to provide you guide with all videos so that you can learn directly from docs and get all information in one place.

No need to make notes or write down anything. Just read the docs.

## Maximize Your Learning

1. **Read Actively:**
    - Take Your Time: Don’t rush through the content. Take the time to understand each section thoroughly.
    - Highlight Key Points: If you find something important, highlight it or make a note of it for future reference.

2. **Practice What You Learn**
    - Hands-On Practice: Try out code examples and exercises as you read through the documentation. This will help reinforce your understanding.
    - Build Projects: Apply what you've learned by building small projects or components. This practical application is crucial for mastering new skills.

3. **Utilize Additional Resources**
    - Cross-Reference: If a topic is unclear, look for additional resources like blogs, videos, or forums for different explanations and perspectives.
    - Ask Questions: Don’t hesitate to ask questions in our community or seek help from peers if you encounter any difficulties.

---

# Page: welcome
author: Hitesh Choudhary
lastUpdated: Apr 14, 2025
---

# Welcome

Haanji! Swagat hai Chai aur Docs mein. 🎉

This guide has been carefully curated as a comprehensive reference for the “Chai aur Git” series on the Chai aur Code YouTube channel. For the best learning experience, we recommend following these docs alongside our video tutorials.

> [!TIP]
> Play
> Let’s begin with the basics in the next section…

## Start your journey with ChaiCode

All of our courses are available on chaicode.com. Feel free to check them out.

---

# Page: git-and-github
author: Hitesh Choudhary
lastUpdated: Apr 14, 2025
---

# Git and GitHub

Let’s start with the basics. Git is a version control system that allows you to track changes to your files and collaborate with others. It is used to manage the history of your code and to merge changes from different branches. I can understand that as of now these terms like version control, branches, and merges are not familiar to you. But don’t worry, we will learn them in this tutorial.

## Git and Github are different

Git is a version control system that is used to track changes to your files. It is a free and open-source software that is available for Windows, macOS, and Linux. Remember, GIT is a software and can be installed on your computer.

Github is a web-based hosting service for Git repositories. Github is an online platform that allows you to store and share your code with others. It is a popular platform for developers to collaborate on projects and to share code. It is not that Github is the only provider of Git repositories, but it is one of the most popular ones.

## A little on version control systems

Version control systems are used to manage the history of your code. They allow you to track changes to your files and to collaborate with others. Version control systems are essential for software development. Consider version control as a checkpoint in game. You can move to any time in the game and you can always go back to the previous checkpoint. This is the same concept in software development.

Before Git became mainstream, version control systems were used by developers to manage their code. They were called SCCS (Source Code Control System). SCCS was a proprietary software that was used to manage the history of code. It was expensive and not very user-friendly. Git was created to replace SCCS and to make version control more accessible and user-friendly. Some common version control systems are Subversion (SVN), CVS, and Perforce.

## Learning Path

In this tutorial, we will learn the basics of Git and Github. We will start with the basics and then move on to more advanced topics. We will also learn how to use Git and Github for collaboration and version control. By the end of this tutorial, you will have a good understanding of Git and Github and will be able to use them to manage your code effectively.

We will go in this journey something like this:
1. Get the basics
2. Use it daily
3. Face the problems
4. Solve them
5. Learn more

We will focus more on Git first, once you understand git, moving towards Github will be easy.

## Install Git

To install Git, you can use command line or you can visit official website and download the installer for your operating system. Git is available for Windows, macOS, and Linux and is available at https://git-scm.com/downloads.

## Account on Github

Another step that you have to follow is to create an account on Github. I will later walk you through the process of linking your Github account with your Machine. You cannot push your code to Github without ssh-key setup. Password authentication is not recommended and these days it is not possible to use it. So, you need to setup ssh-key authentication. We will cover that in a later part of the tutorial.

---

# Page: terminology
author: Hitesh Choudhary
lastUpdated: Apr 14, 2025
---

# Terminology

Git and people who use it talk in a different terminology. For example they don’t call it a folder, they call it a repository. They don’t call it alternative timeline, they call it branch. Although, I agree that alternative timeline is a better name for it. 😁

## Check your git version

To check your git version, you can run the following command:

```bash
git --version
```

This command will display the version of git installed on your system. Git is a very stable software and don’t get any breaking changes in majority of the cases, at least in my experience.

## Repository

A repository is a collection of files and directories that are stored together. It is a way to store and manage your code. A repository is like a folder on your computer, but it is more than just a folder. It can contain other files, folders, and even other repositories. You can think of a repository as a container that holds all your code.

There is a difference between a software on your system vs tracking a particular folder on your system. At any point you can run the following command to see the current state of your repository:

```bash
git status
```

Not all folders are meant to be tracked by git. Here we can see that all green folders are projects are getting tracked by git but red ones are not.

## Your config settings

Github has a lot of settings that you can change. You can change your username, email, and other settings. Whenever you checkpoint your changes, git will add some information about your such as your username and email to the commit. There is a git config file that stores all the settings that you have changed. You can make settings like what editor you would like to use etc. There are some global settings and some repository specific settings.

Let’s setup your email and username in this config file. I would recommend you to create an account on github and then use the email and username that you have created.

```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

Now you can check your config settings:

```bash
git config --list
```

This will show you all the settings that you have changed.

## Creating a repository

Creating a repository is a process of creating a new folder on your system and initializing it as a git repository. It’s just regular folder to code your project, you are just asking git to track it. To create a repository, you can use the following command:

```bash
git status
git init
```

`git status` command will show you the current state of your repository. `git init` command will create a new folder on your system and initialize it as a git repository. This adds a hidden .git folder to your project.

## Commit

Commit is a way to save your changes to your repository. It is a way to record your changes and make them permanent. You can think of a commit as a snapshot of your code at a particular point in time. When you commit your changes, you are telling git to save them in a permanent way. This way, you can always go back to that point in time and see what you changed.

## Complete git flow

A complete git flow, along with pushing the code to github:

1. Use `init` command to create a new repository.
2. Use `add` command to add the folder to the repository.
3. Use `commit` command to save the changes.
4. Use `push` command to push the changes to github.

Of course there is more to it but this is the basic flow.

## Stage

Stage is a way to tell git to track a particular file or folder. You can use the following command to stage a file:

```bash
git init
git add <file> <file2>
git status
```

Here we are initializing the repository and adding a file to the repository. Then we can see that the file is now being tracked by git. Currently our files are in staging area, this means that we have not yet committed the changes but are ready to be committed.

## Logs

```bash
git log
```

This command will show you the history of your repository. It will show you all the commits that were made to the repository. You can use the `--oneline` flag to show only the commit message. This will make the output more compact and easier to read.

## Change default code editor

You can change the default code editor in your system to vscode. To do this, you can use the following command:

```bash
git config --global core.editor "code --wait"
```

## Gitignore

Gitignore is a file that tells git which files and folders to ignore. It is a way to prevent git from tracking certain files or folders. You can create a gitignore file and add list of files and folders to ignore by using the following command:

Example:
`.gitignore`
``` bash
node_modules
.env
.vscode
```

Now, when you run the `git status` command, it will not show the `node_modules` and `.vscode` folders as being tracked by git.

---

# Page: behind-the-scenes
author: Hitesh Choudhary
lastUpdated: Apr 14, 2025
---

# Git behind the scenes

Git is a version control system that allows you to track changes to your files and folders. It is a powerful tool that can help you manage your code more effectively. In this section, we will explore the basics of how git works internally.

## Git Snapshots

A git snapshot is a point in time in the history of your code. It represents a specific version of your code, including all the files and folders that were present at that time. Each snapshot is identified by a unique hash code, which is a string of characters that represents the contents of the snapshot.

A snapshot is not an image, it’s just a representation of the code at a specific point in time. Snapshot is a loose term that is used when git stores information about the code in a locally stored key-value based database. Everything is stored as an object and each object is identified by a unique hash code.

## 3 Musketeers of Git

The three musketeers of git are:
1. Commit Object
2. Tree Object
3. Blob Object

## Commit Object

Each commit in the project is stored in .git folder in the form of a commit object. A commit object contains the following information:
- Tree Object
- Parent Commit Object
- Author
- Committer
- Commit Message

## Tree Object

Tree Object is a container for all the files and folders in the project. It contains the following information:
- File Mode
- File Name
- File Hash
- Parent Tree Object

Everything is stored as key-value pairs in the tree object. The key is the file name and the value is the file hash.

## Blob Object

Blob Object is present in the tree object and contains the actual file content. This is the place where the file content is stored.

## Helpful commands

Here are some helpful commands that you can use to explore the git internals:

```bash
git show -s --pretty=raw <commit-hash>
```

Grab tree id from the above command and use it in the following command to get the tree object:

```bash
git ls-tree <tree-id>
```

Grab tree id from the above command and use it in the following command to get the blob object:

```bash
git show <blob-id>
```

Grab tree id from the above command and use it in the following command to get the commit object:

```bash
git cat-file -p <commit-id>
```

---

# Page: branches-in-git
author: Hitesh Choudhary
lastUpdated: Apr 14, 2025
---

# Branches in Git

Branches are a way to work on different versions of a project at the same time. They allow you to create a separate line of development that can be worked on independently of the main branch. This can be useful when you want to make changes to a project without affecting the main branch or when you want to work on a new feature or bug fix.

Some developers can work on Header, some can work on Footer, some can work on Content, and some can work on Layout. This is a good example of how branches can be used in git.

## HEAD in git

The HEAD is a pointer to the current branch that you are working on. It points to the latest commit in the current branch. When you create a new branch, it is automatically set as the HEAD of that branch.

The default branch used to be master, but it is now called main. There is nothing special about main, it is just a convention.

## Creating a new branch

To create a new branch, you can use the following command:

```bash
git branch
git branch bug-fix
git switch bug-fix
git log
git switch main
git switch -c dark-mode
git checkout orange-mode
```

Some points to note:
- `git branch` - This command lists all the branches in the current repository.
- `git branch bug-fix` - This command creates a new branch called bug-fix.
- `git switch bug-fix` - This command switches to the bug-fix branch.
- `git log` - This command shows the commit history for the current branch.
- `git switch main` - This command switches to the main branch.
- `git switch -c dark-mode` - This command creates a new branch called dark-mode.
- `git checkout orange-mode` - This command switches to the orange-mode branch.

## Merging branches

Merging is about bringing changes from one branch to another.

In Git we have two types of merges :
1. Fast-Forward Merges (If branches have not diverged)
2. 3-Way Merges (if branches have diverged)

## Fast-forward merge

This one is easy as branch that you are trying to merge is usually ahead and there are no conflicts.

When you are done working on a branch, you can merge it back into the main branch. This is done using the following command:

```bash
git checkout main
git merge bug-fix
```

Some points to note:
- `git checkout main` - This command switches to the main branch.
- `git merge bug-fix` - This command merges the bug-fix branch into the main branch.

This is a fast-forward merge. It means that the commits in the bug-fix branch are directly merged into the main branch. This can be useful when you want to merge a branch that has already been pushed to the remote repository.

## 3 Way merge

In this type of merge, the main branch has additional commits that are not present in the bug-fix branch. This is not a fast-forward merge. Here git looks at 3 different commits [common ancestor of branches + tips of each branch] and combines the changes into one merge commit.

When you are done working on a branch, you can merge it back into the main branch. This is done using the following command:

```bash
git checkout main
git merge bug-fix
```

If the command are same, what is the difference between fast-forward and not fast-forward merge?
The difference is resolving the conflicts. In a fast-forward merge, there are no conflicts. But in a not fast-forward merge, there are conflicts, and there are no shortcuts to resolve them. You have to manually resolve the conflicts.

## Managing conflicts

There is no magic button to resolve conflicts. You have to manually resolve the conflicts. Decide, what to keep and what to discard. VSCode has a built-in merge tool that can help you resolve the conflicts. I personally use VSCode merge tool. Github also has a merge tool that can help you resolve the conflicts but most of the time I handle them in VSCode and it gives me all the options to resolve the conflicts.

## Rename a branch

You can rename a branch using the following command:

```bash
git branch -m <old-branch-name> <new-branch-name>
```

## Delete a branch

You can delete a branch using the following command:

```bash
git branch -d <branch-name>
```

---

# Page: diff-stash-tags
author: Hitesh Choudhary
lastUpdated: Apr 14, 2025
---

# Diff, Stash and Tags

This guide will help you understand the different commands related to diff, tags and stash in git. These are not main stream commands but they are very useful in certain situations.

## Git diff

The git diff is an informative command that shows the differences between two commits. It is used to compare the changes made in one commit with the changes made in another commit. Git consider the changed versions of same file as two different files. Then it gives names to these two files and shows the differences between them.

How to Read the Diff Output:
- `a/` – the original file (before changes)
- `b/` – the updated file (after changes)
- `---` – marks the beginning of the original file
- `+++` – marks the beginning of the updated file
- `@@` – shows the line numbers and position of changes

## Comparing Working Directory and Staging Area

```bash
git diff
```

This command shows the unstaged changes in your working directory compared to the staging area.

## Comparing Staging Area with Repository

```bash
git diff --staged
```

This command shows the changes between your last commit and the staging area.

## Comparing Two Branches

```bash
git diff <branch-one> <branch-two>
```

## Git Stash

Stash is a way to save your changes in a temporary location. It’s useful when switching branches without losing work. You can then come back to the file later and apply the changes.

```bash
git stash
```

## Naming the stash

You can also name the stash by using the following command:

```bash
git stash save "work in progress on X feature"
```

## View the stash list

```bash
git stash list
```

## Apply the Most Recent Stash

```bash
git stash apply
```

## Applying and Drop a Stash

```bash
git stash pop
```

This command applies the stash and drops it from the stash list.

## Git Tags

Tags are a way to mark a specific point in your repository. They are useful when you want to remember a specific version of your code or when you want to refer to a specific commit. Tags are like sticky notes that you can attach to your commits.

## Creating a tag

```bash
git tag <tag-name>
```

## Create an annotated tag

```bash
git tag -a <tag-name> -m "Release 1.0"
```

## List all tags

```bash
git tag
```

---

# Page: managing-history
author: Hitesh Choudhary
lastUpdated: Apr 14, 2025
---

# Managing History

This guide will help you understand how to manage your Git history effectively.

## Merge commits

A merge commit is a commit that combines two or more commits into one. It is created when you merge two or more branches into a single branch. The merge commit contains all the changes from the original branches, and it is used to keep the project history clean and easy to understand.

## Rebase in git

Git rebase is a powerful Git feature used to change the base of a branch. It effectively allows you to move a branch to a new starting point, usually a different commit, by “replaying” the commits from the original base onto the new base. This can be useful for keeping a cleaner, linear project history.

## Resolve any conflicts

If there are any conflicts, you will need to resolve them manually. You can use the merge tool in VSCode to resolve the conflicts.

```bash
git add <resolved-files>
git rebase --continue
```

## Git reflog

Git reflog is a command that shows you the history of your commits. It allows you to see the changes that you have made to your repository over time.

## View the reflog:

```bash
git reflog
```

## Recover lost commits or changes

```bash
git reflog <commit-hash>
git reset --hard <commit-hash>
```

---

# Page: collaborate-with-github
author: Hitesh Choudhary
lastUpdated: Apr 14, 2025
---

# About Github

This guide will help you get started with Github.

## What is Github?

Github is a web-based Git repository hosting service. It is a popular platform for developers to collaborate on projects and to share code.

Some other alternatives of Github are:
- Gitlab
- Bitbucket
- Azure Repos
- Gitea

## Setup SSH Key

If you haven’t done it already, you need to setup ssh key and add it to your github account.

## Generate a new SSH key

```bash
ssh-keygen -t ed25519 -C "your-email@chaicode.com"
```

## Publish Code to Remote Repository

```bash
git init
git add <files>
git commit -m "commit message"
```

## Remote URL Setting

```bash
git remote -v
```

## Add Remote Repository

```bash
git remote add origin <remote-url>
```

## Pushing Code

```bash
git push origin main
```

## Setup an upstream remote

```bash
git push -u origin main
```

## Get code from remote repository

There are two ways to get code from a remote repository:
1. fetch the code
2. pull the code

## Fetch code

```bash
git fetch <remote-name>
```

## Pull code

```bash
git pull origin main
```

