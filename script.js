// 获取 HTML 元素
const textInput = document.getElementById("text-input");
const imageInput = document.getElementById("image-input");
const submitButton = document.getElementById("submit-button");
const keywordsList = document.getElementById("keywords-list");
const analysisResult = document.getElementById("analysis-result");
const dataContainer = document.getElementById("data-container");

// 点击分析按钮事件
submitButton.addEventListener("click", async () => {
    const text = textInput.value;
    const image = imageInput.files[0];

    if (!text && !image) {
        alert("请提供文字输入或图片上传！");
        return;
    }

    // 显示加载状态
    analysisResult.textContent = "分析中，请稍候...";
    keywordsList.innerHTML = "";
    dataContainer.innerHTML = "";

    try {
        // 构造表单数据
        const formData = new FormData();
        if (text) formData.append("input", text); // 根据后端字段名
        if (image) formData.append("image", image); // 根据后端字段名

        // 调用后端接口
        const response = await fetch("http://47.97.124.93:8000/kimi-chat/", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("分析失败，请稍后重试！");
        }

        // 解析后端返回的数据
        const data = await response.json();

        // 检查 response_text 是否存在
        if (!data.response_text) {
            throw new Error("后端返回数据格式不正确！");
        }

        // 解析 response_text 中的内容
        const keywordsMatch = data.response_text.match(/<keywords>([\s\S]*?)<\/keywords>/);
        const resultsMatch = data.response_text.match(/<result>([\s\S]*?)<\/result>/);
        const urlsMatch = data.response_text.match(/<url>([\s\S]*?)<\/url>/);

        // 提取关键词
        const keywords = keywordsMatch ? keywordsMatch[1].split(",").map(kw => kw.trim().replace(/['"]/g, "")) : [];
        // 提取结果
        const results = resultsMatch ? resultsMatch[1].split(",").map(res => res.trim().replace(/['"]/g, "")) : [];
        // 提取 URL 链接
        const urls = urlsMatch ? urlsMatch[1].split(",").map(url => url.trim().replace(/['"]/g, "").replace(/\\\\n/g, "")) : [];

        // 显示关键词
        if (keywords.length > 0) {
            keywordsList.innerHTML = "";
            keywords.forEach(keyword => {
                const li = document.createElement("li");
                li.textContent = keyword;
                keywordsList.appendChild(li);
            });
        } else {
            keywordsList.innerHTML = "<li>未提取到关键词</li>";
        }

        // 显示分析结果
        analysisResult.textContent = "分析完成，请查看下方结果。";

        // 显示爬取结果
        if (results.length > 0 && urls.length > 0) {
            dataContainer.innerHTML = "";
            for (let i = 0; i < Math.min(results.length, urls.length); i++) {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `<strong>${results[i]}</strong><br><a href="${urls[i]}" target="_blank">${urls[i]}</a>`;
                dataContainer.appendChild(card);
            }
        } else {
            dataContainer.innerHTML = "<p>未找到相关数据</p>";
        }

    } catch (error) {
        // 错误处理
        analysisResult.textContent = `分析出错：${error.message}`;
        console.error("错误详情：", error);
    }
});
