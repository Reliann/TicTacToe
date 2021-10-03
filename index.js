
    //globals:
    var resault_divs = document.getElementsByClassName('resault_div')
    var game_div = document.getElementById('game_div')
    var full_game_table = document.getElementById('gametable')
    ended = false
    var Oturn = 0; //o allways starts. while even its thier turn and odd means x turn
    var player_moves = []  //last in first out
    var board_size = 3
    var best = Math.pow(board_size,2) +1
    var gametable =[]
    var x_img = document.createElement('img')
    var o_img = document.createElement('img')
    Object.assign(o_img,{name:'o_img',src:'o.png'})
    Object.assign(x_img,{name:'x_img',src:'x.png'})
    o_img.style.display= 'none'
    x_img.style.display= 'none'

    //create the table
    createTableElement(board_size)


    //fun for background color :D
    document.getElementById('body').style.backgroundColor = GetRandomColor()
    function GetRandomColor()
    {
        var color ="#" + ((1<<24)*Math.random() | 0).toString(16)
        return color
    }

    
    // those are the game functions:
    

    function appendImgToTD(td)
    //add images to new td
    {
        td.appendChild(x_img.cloneNode())
        td.appendChild(o_img.cloneNode())
    }
    function gameTurn(chosen_cell)
    //this will happend when a player choose cell
    {   

        // the turn wont happend on the next conditions
        if (chosen_cell.dataset.mark != '' || ended)// means the cell is taken !
            return

        //add to cells used
        player_moves.push(chosen_cell)
        
        // paramenters to check if player won
        var col_win=0
        var row_win=0
        var tilt_left_win=0
        var tilt_right_win = 0

      
        if(Oturn%2==0)// on o turn
        
        {
            
            //display the o image:
            chosen_cell.dataset.mark = 'o'
            xoDisplay(chosen_cell,'o')
            
            //chosen_cell.getElementsByTagName('img').o_img.style.display='inline'
            
            // this checks for o win on row,col,and tilt"            
            for(var i = 0;i<game_table.length;i++)
            {
            
                //if you get 3 row_win, means 3 'o's have the same row as o and he wins same with coloums
                if (game_table[i].dataset.row == chosen_cell.dataset.row ) 
                
                {
                    if(game_table[i].dataset.mark == 'o')
                    {
                        row_win++
                    }
                }
                if (game_table[i].dataset.col == chosen_cell.dataset.col )
                {
                    if(game_table[i].dataset.mark == 'o')
                    {
                        col_win++
                    }
                }
                //tilt check is more tricky, same cells share the tilt value.
                if (chosen_cell.dataset.tiltleft !='none' && game_table[i].dataset.tiltleft == chosen_cell.dataset.tiltleft )
                {
                    if(game_table[i].dataset.mark == 'o')
                    {
                        tilt_left_win++
                    }
                }
                if ( chosen_cell.dataset.tiltright!='none' && game_table[i].dataset.tiltright == chosen_cell.dataset.tiltright)
                {
                    if(game_table[i].dataset.mark == 'o')
                    {
                        tilt_right_win++
                    }
                }
            }
            
            if (col_win==board_size||tilt_left_win==board_size||row_win==board_size||tilt_right_win==board_size)
            {
                endGame('o_win')
                return
            }

            
        }
        else{
            chosen_cell.dataset.mark = 'x'
            xoDisplay(chosen_cell,'x')
           
            for(var i = 0;i<game_table.length;i++)
            {
                
                if (game_table[i].dataset.row == chosen_cell.dataset.row )
                {
                    if(game_table[i].dataset.mark == 'x')
                    {
                        row_win++
                    }
                }
                if (game_table[i].dataset.col == chosen_cell.dataset.col )
                {
                    if(game_table[i].dataset.mark == 'x')
                    {
                        col_win++
                    }
                }
                
                if (chosen_cell.dataset.tiltleft !='none' && game_table[i].dataset.tiltleft == chosen_cell.dataset.tiltleft )
                {
                    if(game_table[i].dataset.mark == 'x')
                    {
                        tilt_left_win++
                    }
                }
                if ( chosen_cell.dataset.tiltright!='none' && game_table[i].dataset.tiltright == chosen_cell.dataset.tiltright)
                {
                    if(game_table[i].dataset.mark == 'x')
                    {
                        tilt_right_win++
                    }
                }
            }
            if (col_win==board_size||tilt_left_win==board_size||row_win==board_size||tilt_right_win==board_size)
            {
                endGame('x_win')
                return
            }
            
        }
        console.log(Oturn)
        if (Oturn==Math.pow(board_size,2)-1)
        {
            
            endGame()
        }

        // make sure its x turn next
        Oturn ++
        
    }

    function resetGame()
    //reset button
    {
        ended=false
        for(var i = 0;i<resault_divs.length;i++)
        {
            resault_divs[i].style.display = 'none'
        }
        
        Oturn = 0
        //game_div.style.display = 'inline'
        var images;
        for(var i =0;i<game_table.length;i++)
        {
            game_table[i].dataset.mark = ''

            xoDisplay(game_table[i])

        }
        player_moves =[]
    }
    function endGame(resault)
    //shows results and ends game
    {
        ended =true
        switch (resault)
        {
            case 'x_win':
                console.log('x win!')
                resault_divs.x_win.style.display ='flex'
                //game_div.style.display='none'
                break
            case 'o_win':
                console.log('o win!')
                resault_divs.o_win.style.display ='flex'
                //game_div.style.display='none'
                break
            default:
                console.log('its a tie!')
                //game_div.style.display='none'
                resault_divs.tie.style.display ='flex'

        }
        if (best>player_moves.length)
        {
            best = player_moves.length
        }
        player_moves =[]
        //this is for the hover function, it has no actual effects after the game ended 
        //also the only time a td will have mark data diffrent then actual image (game ended before reset)
        for(var i =0;i<game_table.length;i++)
        {
            game_table[i].dataset.mark = 'gameover'
        }
    }
    function hideDiv(x_button)
    //hide button for a div
    {
        x_button.parentElement.style.display='none'
    }
    function stepBack()
    //this function remove display of last td's image in the stack, and reset the turn
    {
        if (ended)
        {
            alert('game ended!')
            return
        }
        if (player_moves.length==0)
        {
            alert('no more moves!')
            return
        }
        if(player_moves[player_moves.length-1]== 'imported')
        {
            alert('cant redo imported moves!')
        }
        
        var redo_td= player_moves.pop()
        
        redo_td.dataset.mark = ''       
        xoDisplay(redo_td)    
        Oturn --
        
    }

    function bestRecord()
    // alert the best record
    {
        if (best==Math.pow(board_size,2)+1)
        {
            alert('no record yet!')
        }
        else
        {
            alert(`shortest game had ${best } moves`)
        }
    }

    function saveGame()
    {
        // saves the table object, the oturn, the player moves, and the best record
        if (ended)
        {
            alert("can't save ended games...")
        }
        var table = []
        for (var i = 0;i<game_table.length;i++)
        {
            table.push(game_table[i].dataset.mark)
        }
        var new_coockie = {"turn":Oturn, "best":best, "table":table}
        document.cookie = JSON.stringify(new_coockie)
        
    }
    function importGame()
    //  to get stuff from the cookie
    {
        if (!document.cookie)
        {
            alert('no game saved')
            return
        }
        var new_game_data = JSON.parse(document.cookie);
        if (new_game_data)
        {
            ended =false
            player_moves=[]
            Oturn = new_game_data.turn 
            if (best<new_game_data.best)
            {
                best = new_game_data.best
            }
            board_size =  Math.sqrt(new_game_data.table.length)
            createTableElement(board_size)
            console.log(game_table,new_game_data.table,new_game_data.table.length)
            var played_moves = 0
            for (var i = 0;i<game_table.length;i++)
            {
                game_table[i].dataset.mark = new_game_data.table[i]
                if (game_table[i].dataset.mark == 'x')
                {
                    xoDisplay(game_table[i],'x')
                    played_moves++
                }
                if (game_table[i].dataset.mark == 'o')
                {
                    xoDisplay(game_table[i],'o')
                    played_moves++
                }
            }
            while(played_moves>0)
            {
                player_moves.push('imported')
                played_moves--
            }
            
            
        }
    }
    function xoDisplay(td,show='none')
    //show either x,o or nothing in cell
    {
        
        var td_images = td.getElementsByTagName('img')
        switch(show)
        {
            case 'o':
                td_images.o_img.style.display = 'block'
                td_images.x_img.style.display = 'none'
                td.className  = 'otd'

                break
            case 'x':
                td_images.o_img.style.display = 'none'
                td_images.x_img.style.display = 'block'
                td.className = 'xtd'
             
                break
            default:
                td_images.o_img.style.display = 'none'
                td_images.x_img.style.display = 'none'

                td.className  = ''
        }
    }
    function customTable()
    //set a bigger table for the game, between 3-20 rows
    {
        var table_size = prompt('your new table size:')
        
        if (!table_size|| table_size=='' || isNaN(table_size) || !Number.isInteger(parseInt(table_size)))
        {
            return
        }
        if(table_size<3)
        {
            alert('custom table size must be greater then three')
            return
        }
        if(table_size>20)
        {
            alert('we dont go above 20!')
            return
        }
        board_size = table_size
        // strat a new game:
        ended = false
        Oturn = 0; 
        player_moves = []
        best = Math.pow(table_size,2)
        game_table= []  
        createTableElement(board_size)
        
    }
    function createTableElement(table_size=3)
    // create table cells for the game
    {
         
        full_game_table.innerHTML = '' //delete the last table
        
        

        for(var i = 0; i < table_size;i++)
        {
            var new_tr = document.createElement('tr')
            
            for(var j = 0; j< table_size;j++)
            {
                var new_td = document.createElement('td')
                
                new_td.setAttribute('data-mark', "")
                new_td.setAttribute('data-col', j.toString())
                new_td.setAttribute('data-row', i.toString())
                new_td.setAttribute('data-tiltleft', "none")
                new_td.setAttribute('data-tiltright', "none")
                new_td.setAttribute('onclick', 'gameTurn(this)')
                    
                appendImgToTD(new_td)
                if(i==j)
                {
                    new_td.setAttribute('data-tiltleft', "yes")
                }
                if(table_size-i-1==j)
                {
                    new_td.setAttribute('data-tiltright', "yes")
                }
                new_tr.appendChild(new_td)
            }
            
            full_game_table.appendChild(new_tr)
        }
        game_table = full_game_table.getElementsByTagName('td')
        
    }
