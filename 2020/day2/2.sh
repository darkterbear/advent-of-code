input="./input"
counter=0

while IFS= read -r line
do
  IFS=': -'
  parts=($line)
  unset IFS
  a=${parts[0]}
  b=${parts[1]}

  ((a=a-1))
  ((b=b-1))
  
  char=${parts[2]}
  pass=${parts[3]}
  
  if [ "${pass:a:1}" = "${char}" ] && [ "${pass:b:1}" != "${char}" ]; then
    echo "${pass:a:1} ${pass:b:1} ${char} "
    ((counter=counter+1))
    echo ${counter}
  fi

  if [ "${pass:a:1}" != "${char}" ] && [ "${pass:b:1}" = "${char}" ]; then
    ((counter=counter+1))
    echo ${counter}
  fi
  
done < "$input"

echo "\n"
echo ${counter}