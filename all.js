const api =
  'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6';
let data = [];
let locations = [
  '臺北市',
  '新北市',
  '基隆市',
  '桃園縣',
  '新竹市',
  '新竹縣',
  '苗栗縣',
  '臺中市',
  '南投縣',
  '彰化縣',
  '雲林縣',
  '嘉義市',
  '嘉義縣',
  '臺南市',
  '高雄市',
  '屏東縣',
  '宜蘭縣',
  '花蓮縣',
  '臺東縣',
  '澎湖縣',
  '金門縣',
  '連江縣',
];
let locationDOM = document.querySelector('.category');
let noEventDOM = document.querySelector('.noEvent');
let listDOM = document.querySelector('.list');

axios
  .get(api)
  .then(res => {
    data = res.data;
    console.log(data);
    creatOption();
    creatData();
  })
  .catch(err => {
    console.log(err);
  });

function creatOption() {
  locations.forEach(location => {
    const option = document.createElement('option');
    option.text = location;
    locationDOM.add(option);
  });
}

function creatData() {
  render();
}

function render() {
  let str = '';
  let dataFinal;

  if (locationDOM.value === '顯示全部') {
    dataFinal = data;
  } else {
    let dataFilter = data.filter(item => {
      return item.showInfo[0].location.slice(0, 3) == locationDOM.value;
    });
    dataFinal = dataFilter;
  }

  dataFinal.forEach(item => {
    str += `<div class="col p-3">
              <div class="card">
                <div class="card-body">
                  <span class="badge bg-success mb-3 text-white">${item.showInfo[0].location.slice(0, 3)}
                  </span>
                  <h2 class="h4 card-title">${item.title}</h2>
                </div>

                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    展出期間： ${item.startDate}~${item.endDate}
                  </li>
                  <li class="list-group-item">
                    地點： ${item.showInfo[0].locationName}
                  </li>
                  <li class="list-group-item">
                    地址： ${item.showInfo[0].location}
                  </li>
                </ul>
                
                <div class="card-body">
                  <i class="fas fa-external-link-alt"></i>  
                  <a href="${item.sourceWebPromote}" class="card-link">${item.sourceWebName}</a>
                </div>
              </div>
            </div>`;
  });

  if (dataFinal.length === 0) {
    noEventDOM.innerHTML = `<p class="text-center mt-5">這縣市目前沒有任何展覽喔！</p>`;
  } else {
    noEventDOM.innerHTML = '';
  }

  listDOM.innerHTML = str;
}

locationDOM.addEventListener('change', render);