// SPA.js
// Code running on the client side
// Single Page Application written with JavaScript only (no framework)


// NEWS ---------------
let requestNews = new XMLHttpRequest();

let apiKeyNews = "1c05c9b62d574400aa12613d42c083b8";

requestNews.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
             displayArticles(this.responseText);       
    }
}


// TWEETS ---------------
let requestTweets = new XMLHttpRequest();

let apiKeyTweets = "BJVr32yUrNipqBoA69TdUgrld3EYXLRA";

requestTweets.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
             displayTweets(this.responseText);       
    }
}


// NEWS ---------------
function newArticle(i) {
    
    $("#marker").append(`
    
        <div class="row mt-3">
    
        <div class="col-md-3">
            <img class="img-fluid rounded" id="article_`+ i + `_img" src="" alt="">
        </div>
        
        <div class="col-md-9">
            <div class="row">
                <div class="col-md-3 text-uppercase">
                    <strong>Source</strong>
                </div>
                <div class="col-md-9" id="article_`+ i + `_source">
                
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 text-uppercase">
                    <strong>Author</strong>
                </div>
                <div class="col-md-9" id="article_`+ i + `_author">
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 text-uppercase">
                    <strong>Title</strong>
                </div>
                <div class="col-md-9" id="article_`+ i + `_title">
                    
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 text-uppercase">
                    <strong>Description</strong>
                </div>
                <div class="col-md-9" id="article_`+ i + `_description">
                    
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 text-uppercase">
                    <strong>ARTICLE</strong>
                </div>
                <div class="col-md-9" id="">
                    <a id="article_`+ i + `_url" href="" target="_blank"></a>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-3 text-uppercase">
                    <strong>Published at</strong>
                </div>
                <div class="col-md-9" id="article_`+ i + `_published_at">
                    
                </div>
            </div>
        </div>
    
    </div>
    
    <hr>
    `)
    
}

function writeArticle(i, article) {
    
    $("#article_" + i + "_img").attr("src", article["urlToImage"]);
    $("#article_" + i + "_url").attr("href", article["url"]);
    $("#article_" + i + "_source").text(article["source"]["name"]);
    $("#article_" + i + "_author").text(article["author"]);
    $("#article_" + i + "_title").text(article["title"]);
    $("#article_" + i + "_description").text(article["description"]);
    $("#article_" + i + "_url").text("READ FULL ARTICLE");
    // $("#article_" + i + "_url").text(article["url"]);
    $("#article_" + i + "_content").text(article["content"]);
    $("#article_" + i + "_published_at").text(article["publishedAt"].substring(0, 10) + " " + article["publishedAt"].substring(11, 16));
    
}

function displayArticles(apiData) {
    
    $("#marker").empty();
    
    let newsData        = JSON.parse(apiData);
    let articlesArray   = newsData["articles"];
    
    for (i=0; i < articlesArray.length; i++) {
        
        newArticle(i);
        writeArticle(i, articlesArray[i]);
    
    };
    
}

function submitSearch() {
    
    let query           = $("#searchbar").val();
    let radioSortBy     = $("input[name='sortBy']:checked").val();
    let radioLanguage   = $("input[name='language']:checked").val();
    let yesterday       = new Date(Date.now() - 86400000); // 24 * 60 * 60 * 1000
    yesterday           = yesterday.getFullYear() + '-' + (yesterday.getMonth() + 1) + '-' + yesterday.getDate() 
    
    requestNews.open("GET", "https://newsapi.org/v2/everything?q=("  
                                    + query + ")" 
                                    + "&from="     + yesterday
                                    + "&language=" + radioLanguage
                                    + "&sortBy="   + radioSortBy
                                    + "&apiKey="   + apiKeyNews
    );
    requestNews.send();
    
}

// TWEETS ---------------
function newTweet(i) {
    
    $("#marker").append(`
        <div class="row mt-3">
    
        <div class="col-md-3">
            <img class="img-fluid rounded" id="tweet_`+ i + `_img" src="" alt="">
        </div>
        
        <div class="col-md-9">
            <div class="row">
                <div class="col-md-3 text-uppercase">
                    <strong>Tags</strong>
                </div>
                <div class="col-md-9" id="tweet_`+ i + `_tags">
                    
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 text-uppercase">
                    <strong>Full Tweet</strong>
                </div>
                <div class="col-md-9" id="tweet_`+ i + `_full_tweet">
                    
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 text-uppercase">
                    <strong>User</strong>
                </div>
                <div class="col-md-9" id="tweet_`+ i + `_user">
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 text-uppercase">
                    <strong>Created at</strong>
                </div>
                <div class="col-md-9" id="tweet_`+ i + `_created_at">
                    
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-3 text-uppercase">
                    <strong>TWEET</strong>
                </div>
                <div class="col-md-9" id="">
                    <a id="tweet_`+ i + `_url" href="" target="_blank"></a>
                </div>
            </div>
        </div>
    
    </div>
    
    <hr>    
                        
                        
    `)
    
}

function writeTweet(i, tweet) {
    
    // Browser console
    console.log("******************")
    console.log(i);
    console.log(tweet);
    
    // Getting user profile picture & tweet url
    $("#tweet_" + i + "_img").attr("src", tweet["user"]["profile_image_url_https"]);
    $("#tweet_" + i + "_url").attr("href", "https://www.twitter.com/statuses/" + tweet["id_str"]);
   
   
    // Getting the tags
    let hashtagsArray = [];
    for (j = 0; j < tweet["entities"]["hashtags"].length ; j++) {
        hashtagsArray.push(tweet["entities"]["hashtags"][j]["text"]);
    };
    if (hashtagsArray.length > 0) {
        $("#tweet_" + i + "_tags").text( "#" + hashtagsArray.join(" #"));    
    } else {
        $("#tweet_" + i + "_tags").text("")
    };
    
    
    // Getting the full text. Tweet object structure changing. Look for the "full tweet" key in the object structure.
    if ("retweeted_status" in tweet) {
        console.log(tweet["retweeted_status"]["truncated"])
        if (tweet["retweeted_status"]["truncated"]) {
            $("#tweet_" + i + "_full_tweet").text(tweet["retweeted_status"]["extended_tweet"]["full_text"]);
        } else {
            $("#tweet_" + i + "_full_tweet").text(tweet["retweeted_status"]["text"]);
        };
    } else {
        if ("extended_tweet" in tweet) {
            $("#tweet_" + i + "_full_tweet").text(tweet["extended_tweet"]["full_text"]);
        } else {
             $("#tweet_" + i + "_full_tweet").text( tweet["text"]);
        };
    };
    
    // Clean the "amp;" (generated with special characters) in tweets
    $("#tweet_" + i + "_full_tweet").text($("#tweet_" + i + "_full_tweet").text().replace("&amp;",";"))
    $("#tweet_" + i + "_full_tweet").text($("#tweet_" + i + "_full_tweet").text().replace("&amp;amp;",""))
    
    
    // Getting username and tweet creation date (GMT - NOT user time)
    $("#tweet_" + i + "_user").text( tweet["user"]["name"]);
    $("#tweet_" + i + "_url").text("GO TO TWEET");
    $("#tweet_" + i + "_created_at").text( tweet["created_at"].substring(0, 16) + " (GMT) " + tweet["created_at"].substring(25, 30));
    
}

function displayTweets(apiData) {
    
    $("#marker").empty();
    
    let tweetsArray  = JSON.parse(apiData);
    
    for (i=0; i < tweetsArray.length; i++) {
        
        newTweet(i);
        writeTweet(i, tweetsArray[i]);
        
    };
    
}

function getTweets() {
    
    let collection  = $("input[name='topic']:checked").val();
    requestTweets.open("GET", "https://api.mlab.com/api/1/databases/github-tweets/collections/"
                                    + collection 
                                    + "?apiKey=" + apiKeyTweets);
    requestTweets.send();
    
}
