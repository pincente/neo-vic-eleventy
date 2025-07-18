```bash
#!/bin/bash
input_file="neo-vic-eleventy-project.txt"
current_file=""

while IFS= read -r line; do
  if [[ $line == ===* ]]; then
    if [[ -n "$current_file" ]]; then
      echo "Created $current_file"
    fi
    current_file=$(echo "$line" | sed 's/=== FILE: //; s/ ===//')
    mkdir -p $(dirname "$current_file")
    > "$current_file"
  else
    echo "$line" >> "$current_file"
  fi
done < "$input_file"
chmod +x split-files.sh
```
