import os
import shlex
import subprocess

def run_command(cmd_line, background=False):
    if not cmd_line.strip():
        return

    if cmd_line.strip().startswith("cd"):
        try:
            path = shlex.split(cmd_line)[1]
            os.chdir(path)
        except IndexError:
            print("cd: missing argument")
        except FileNotFoundError:
            print("cd: no such file or directory")
        return

    try:
        if background:
            subprocess.Popen(cmd_line, shell=True)
        else:
            subprocess.run(cmd_line, shell=True)
    except Exception as e:
        print(f"Error executing command: {e}")

def handle_redirection(cmd_line):
    tokens = shlex.split(cmd_line)

    if '>' in tokens:
        idx = tokens.index('>')
        command = ' '.join(tokens[:idx])
        filename = tokens[idx + 1]

        with open(filename, 'w') as f:
            subprocess.run(command, shell=True, stdout=f)
        return True

    elif '<' in tokens:
        idx = tokens.index('<')
        command = ' '.join(tokens[:idx])
        filename = tokens[idx + 1]

        with open(filename, 'r') as f:
            subprocess.run(command, shell=True, stdin=f)
        return True

    return False

def handle_pipes(cmd_line):
    commands = [cmd.strip() for cmd in cmd_line.split('|')]
    processes = []
    prev_pipe = None

    for i, cmd in enumerate(commands):
        if i == 0:
            p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
        elif i == len(commands) - 1:
            p = subprocess.Popen(cmd, shell=True, stdin=prev_pipe.stdout)
        else:
            p = subprocess.Popen(cmd, shell=True, stdin=prev_pipe.stdout, stdout=subprocess.PIPE)

        prev_pipe = p
        processes.append(p)

    for p in processes:
        p.wait()

def shell():
    while True:
        try:
            line = input("shell> ").strip()

            if not line:
                continue

            if line.lower() == "exit":
                break

            background = False
            if line.endswith("&"):
                background = True
                line = line[:-1].strip()

            if "|" in line:
                handle_pipes(line)
            elif handle_redirection(line):
                continue
            else:
                run_command(line, background)

        except KeyboardInterrupt:
            print("\nType 'exit' to quit.")
        except EOFError:
            break

if __name__ == "__main__":
    shell()
