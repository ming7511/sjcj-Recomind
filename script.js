// 获取 HTML 元素
const textInput = document.getElementById("text-input");
const imageInput = document.getElementById("image-input");
const submitButton = document.getElementById("submit-button");
const keywordsList = document.getElementById("keywords-list");
const analysisResult = document.getElementById("analysis-result");
const dataContainer = document.getElementById("data-container");

// 点击分析按钮事件
submitButton.addEventListener("click", async () => {
    // 模拟分析过程
    const text = textInput.value;
    const image = imageInput.files[0];

    if (!text && !image) {
        alert("请提供文字输入或图片上传！");
        return;
    }

    // 显示加载状态
    analysisResult.textContent = "分析中，请稍候...";

    // 模拟调用后端接口（替换为实际的接口调用代码）
    setTimeout(() => {
        // 模拟关键词提取
        const fakeKeywords = ["关键词1", "关键词2", "关键词3"];
        keywordsList.innerHTML = "";
        fakeKeywords.forEach(keyword => {
            const li = document.createElement("li");
            li.textContent = keyword;
            keywordsList.appendChild(li);
        });

        // 模拟分析结果
        analysisResult.textContent = "根据输入内容分析得出，这是一段示例分析结论。";

        // 模拟爬取结果
        const fakeData = [
            { title: "小红书相关帖子1", link: "#" },
            { title: "小红书相关帖子2", link: "#" },
        ];
        dataContainer.innerHTML = "";
        fakeData.forEach(data => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `<a href="${data.link}" target="_blank">${data.title}</a>`;
            dataContainer.appendChild(card);
        });
    }, 2000);
});
