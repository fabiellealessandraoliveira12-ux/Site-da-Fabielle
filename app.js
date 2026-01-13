// enhanced.js - Funcionalidades extras para o site

document.addEventListener('DOMContentLoaded', function() {
    // 1. Atualizar data atual
    const currentDate = document.getElementById('current-date');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.textContent = now.toLocaleDateString('en-US', options);
    
    // 2. Animações para itens da lista
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // 3. Marcar tarefas como completas
    const checkboxes = document.querySelectorAll('.task-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            const taskItem = this.closest('.task-item');
            const isCompleted = taskItem.getAttribute('data-completed') === 'true';
            
            if (isCompleted) {
                // Desmarcar
                this.innerHTML = '<i class="fas fa-square"></i>';
                taskItem.style.opacity = '1';
                taskItem.style.borderLeftColor = 'var(--primary)';
                taskItem.setAttribute('data-completed', 'false');
                
                // Animação de desmarcar
                this.style.animation = 'none';
                setTimeout(() => {
                    this.style.animation = 'bounceOut 0.5s';
                }, 10);
            } else {
                // Marcar como completa
                this.innerHTML = '<i class="fas fa-check-square"></i>';
                this.style.color = 'var(--success)';
                taskItem.style.opacity = '0.7';
                taskItem.style.borderLeftColor = 'var(--success)';
                taskItem.setAttribute('data-completed', 'true');
                
                // Animação de marcação
                this.style.animation = 'bounceIn 0.5s';
            }
            
            updateProgress();
            updateStats();
        });
    });
    
    // 4. Adicionar nova tarefa
    const taskInput = document.querySelector('.task-input');
    const addBtn = document.querySelector('.add-btn');
    const taskList = document.querySelector('.task-list');
    
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });
    
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        // Criar novo item
        const newItem = document.createElement('li');
        newItem.className = 'task-item';
        newItem.setAttribute('data-completed', 'false');
        newItem.innerHTML = `
            <div class="task-checkbox">
                <i class="fas fa-square"></i>
            </div>
            <div class="task-content">
                <h3>${taskText}</h3>
                <p>New task added just now</p>
                <div class="task-tags">
                    <span class="tag feature">New</span>
                    <span class="tag priority">Low Priority</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="action-btn" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        // Adicionar à lista com animação
        taskList.appendChild(newItem);
        newItem.style.animation = 'slideIn 0.5s ease-out forwards';
        newItem.style.opacity = '0';
        
        // Limpar input
        taskInput.value = '';
        
        // Adicionar eventos aos novos botões
        const newCheckbox = newItem.querySelector('.task-checkbox');
        const deleteBtn = newItem.querySelector('.fa-trash').closest('.action-btn');
        const editBtn = newItem.querySelector('.fa-edit').closest('.action-btn');
        
        newCheckbox.addEventListener('click', function() {
            handleCheckboxClick(this);
        });
        
        deleteBtn.addEventListener('click', function() {
            deleteTask(this.closest('.task-item'));
        });
        
        editBtn.addEventListener('click', function() {
            editTask(this.closest('.task-item'));
        });
        
        updateStats();
    }
    
    // 5. Deletar tarefa
    const deleteButtons = document.querySelectorAll('.fa-trash');
    deleteButtons.forEach(btn => {
        btn.closest('.action-btn').addEventListener('click', function() {
            deleteTask(this.closest('.task-item'));
        });
    });
    
    function deleteTask(taskItem) {
        // Animação de saída
        taskItem.style.animation = 'slideOut 0.5s ease-out forwards';
        
        // Remover após animação
        setTimeout(() => {
            taskItem.remove();
            updateStats();
            updateProgress();
        }, 500);
    }
    
    // 6. Sistema de temas melhorado
    const themeBtns = document.querySelectorAll('.theme-btn');
    const body = document.querySelector('body');
    
    themeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Remover classe ativa de todos
            themeBtns.forEach(b => b.classList.remove('active'));
            // Adicionar classe ativa ao clicado
            this.classList.add('active');
            
            if (theme === 'auto') {
                // Detectar preferência do sistema
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    setTheme('dark');
                } else {
                    setTheme('light');
                }
            } else {
                setTheme(theme);
            }
        });
    });
    
    function setTheme(theme) {
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(`${theme}-theme`);
        
        // Salvar preferência
        localStorage.setItem('theme', theme);
    }
    
    // 7. Atualizar estatísticas
    function updateStats() {
        const totalTasks = document.querySelectorAll('.task-item').length;
        const completedTasks = document.querySelectorAll('.task-item[data-completed="true"]').length;
        const pendingTasks = totalTasks - completedTasks;
        
        document.querySelectorAll('.stat-item strong')[0].textContent = completedTasks;
        document.querySelectorAll('.stat-item strong')[1].textContent = pendingTasks;
    }
    
    // 8. Atualizar barra de progresso
    function updateProgress() {
        const totalTasks = document.querySelectorAll('.task-item').length;
        const completedTasks = document.querySelectorAll('.task-item[data-completed="true"]').length;
        const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        
        const progressFill = document.querySelector('.progress-fill');
        progressFill.style.width = `${progress}%`;
    }
    
    // 9. Botão "Complete All"
    const completeAllBtn = document.querySelector('.action-button.primary');
    if (completeAllBtn) {
        completeAllBtn.addEventListener('click', function() {
            const incompleteTasks = document.querySelectorAll('.task-item[data-completed="false"]');
            let delay = 0;
            
            incompleteTasks.forEach(task => {
                setTimeout(() => {
                    const checkbox = task.querySelector('.task-checkbox');
                    if (checkbox) {
                        checkbox.click();
                    }
                }, delay);
                delay += 100; // Intervalo entre animações
            });
        });
    }
    
    // 10. Carregar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedThemeBtn = document.querySelector(`.theme-btn[data-theme="${savedTheme}"]`);
    if (savedThemeBtn) {
        savedThemeBtn.click();
    }
    
    // 11. Adicionar animações CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounceIn {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes bounceOut {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); }
            100% { transform: scale(0.5); opacity: 0; }
        }
        
        @keyframes slideOut {
            to { 
                opacity: 0; 
                transform: translateX(100px); 
                height: 0; 
                padding: 0; 
                margin: 0; 
                border: none; 
            }
        }
    `;
    document.head.appendChild(style);
    
    // Inicializar
    updateStats();
    updateProgress();
});