function versionedDishView(d){
  editIngredients=initialIngredients();
  editSteps=initialSteps();
  dishDrawer('查看菜品',`<div class="version-tabs"><button class="active" data-version-tab="current">当前版本</button><button data-version-tab="new">上游新版本 <span class="version-tag">NEW</span></button></div><div id="versionDetailContent"></div>`,'');
  const draw=mode=>{
    if(mode==='current'){
      $('#versionDetailContent').innerHTML=detailContent(d,true,false);
      return;
    }
    const upstream={...d,code:d.code.replace('ZC','BZ')};
    $('#versionDetailContent').innerHTML=`<div class="version-summary"><b>发现上游新版本 V2.1</b><span>运营端于 2026-08-26 更新</span></div>${detailContent(upstream,true,true)}<div class="version-update-box"><button id="updateDishNow" class="primary">立即更新</button><p>提交后仅更新基础信息、用料明细、烹饪工艺及制作步骤和营养预览。</p></div>`;
    $('#updateDishNow').onclick=()=>{
      if(!confirm('是否确认更新？'))return;
      d.newVersion=false;
      $('#dishDrawerMask').remove();
      showToast('菜品已更新至上游最新版本');
      render('dishes');
    };
  };
  draw('current');
  $$('[data-version-tab]').forEach(b=>b.onclick=()=>{
    $$('[data-version-tab]').forEach(x=>x.classList.toggle('active',x===b));
    draw(b.dataset.versionTab);
  });
}
