/**
 * Created by lucky on 16-7-22.
 */
let m;
function formateBarcodes(tags)
{
    let allBarcodes=tags.map(function (tag) {
        let bar=tag.split('-');
        return {
            barcode:bar[0],
            amount:parseFloat(bar[1])||1
        }
    })
    return allBarcodes;
}

function  mergeBarcodes(allBarcodes) {
    let countBarcodes=[];
    let exist=0;
    for(let i=0;i<allBarcodes.length;i++)
    {
        for(m of countBarcodes)
        {
            exist=(m.barcode===allBarcodes[i].barcode);
            if(exist)
                break;
        }
        if(exist)
        {
            m.amount+=allBarcodes[i].amount;
        }
        else
        {
            countBarcodes.push({barcode:allBarcodes[i].barcode,amount:allBarcodes[i].amount});
        }
    }
    return countBarcodes;
}

function getItemsInfo(countBarcodes)
{
    let showItems=loadAllItems();
    let cartItemsInfo=[];
    for(i=0;i<countBarcodes.length;i++)
    {
        for(m of showItems)
        if(countBarcodes[i].barcode===m.barcode)
        {
            cartItemsInfo.push(Object.assign({},countBarcodes[i],m));
        }
    }
    return cartItemsInfo;
}

function getPromoteInfo(cartItemsInfo) {
    let promoteInfo=[];
    let promotion=loadPromotions();
    for (let i=0;i<cartItemsInfo.length;i++)
    {
        for(m of promotion){
            for(j=0;j<m.barcodes.length;j++)
                if (cartItemsInfo[i].barcode === m.barcodes[j]) {
                    promoteInfo.push(Object.assign({}, cartItemsInfo[i],{type: m.type}));
                }
        }
    }
    return promoteInfo;
}

function getDisSubtotal(cartItemsInfo) {
    let dispromoteSubtotal=[];
    for(let i=0;i<cartItemsInfo.length;i++)
    {
        dispromoteSubtotal.push(Object.assign({},cartItemsInfo[i],
            {dispromoteSubtotal:cartItemsInfo[i].price*cartItemsInfo[i].amount}));
    }
    console.log(JSON.stringify(dispromoteSubtotal,null,4));
    return dispromoteSubtotal;
}

function getpromoteSubtotal(promoteInfo) {

    let promoteSubtotal=[];

    for(let i=0;i<promoteInfo.length;i++)
    {
        console.log(promoteInfo[i].type);
        if(promoteInfo[i].type === "BUY_TWO_GET_ONE_FREE")
        {
            let subtotal=promoteInfo[i].price*promoteInfo[i].amount-parseInt((promoteInfo[i].amount/3))*promoteInfo[i].price;
            promoteSubtotal.push(Object.assign({},promoteInfo[i], {promoteSubtotal:subtotal}));
        }
        else
        {
            promoteSubtotal.push(Object.assign({},promoteInfo[i],
                {promoteSubtotal:promoteInfo[i].price*promoteInfo[i].amount}));
        }

    }
    return promoteSubtotal;
}
//优惠后的总计及节省
function getpromotetotal(promoteSubtotal) {
    let promotetotal=[];
    let total=0,save=0;
    for(let i=0;i<promoteSubtotal.length;i++)
    {
        total+=promoteSubtotal[i].promoteSubtotal;
        save+=(promoteSubtotal[i].dispromoteSubtotal-promoteSubtotal[i].promoteSubtotal);
    }
    promotetotal.push(Object.assign({total:total,save:save}));
    return promotetotal;
}
