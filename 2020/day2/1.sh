input="./input"
counter=0

while IFS= read -r line
do
  IFS=': -'
  parts=($line)
  unset IFS
  min=${parts[0]}
  max=${parts[1]}
  char=${parts[2]}
  pass=${parts[3]}

  times=$(echo "${pass}" | awk -F"${char}" '{print NF-1}')
  
  if [ "${times}" -ge "${min}" ] && [ "${times}" -le "${max}" ]; then
    ((counter=counter+1))
    echo ${counter}
  fi
  
done < "$input"

echo "\n"
echo ${counter}