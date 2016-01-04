# naver_comic_crawler
네이버 웹툰을 긁어오자

### 설치

```
npm install
```

### 사용법

```
node app.js <만화id> <최대 몇화>
```

EMFILE 에러가 발생 할 수 있다.

리눅스에서는 ```ulimit``` 명령을 통해 한번에 열 수 있는 파일 수를 늘리면 되지만,

윈도우 유저들은 각 화 별로 여러 이미지 파일이 존재 하기 때문에 나눠서 받아야 한다.

<최대 몇 화> 옵션을 늘려 가면서 (만화에 따라 다르지만 200화 정도가 적당한다) 반복적으로 명령을 실행한다.

존재하고 있는 파일을 체크하여 이미 생성된 파일에 해당하는 이미지는 다운을 받지 않기 때문에
 중간에 에러가 발생한 파일은 삭제하고 다시 시도하길 바란다.
