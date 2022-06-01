#! /bin/sh

DIFF_URLS=""

for d in $(aws s3 ls s3://vrt-bucket/__diff_output__/ | awk '{print $4}' | grep diff); do
  DIFF_URLS+="![DIFF_URL]("https://vrt-bucket.s3.ap-northeast-2.amazonaws.com/__diff_output__/$d")"
done

echo "::set-output name=DIFF_URLS::$(DIFF_URLS)"
