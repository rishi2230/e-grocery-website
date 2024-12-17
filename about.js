document.addEventListener('DOMContentLoaded', () => {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'scale(1.05)';
            member.style.transition = 'transform 0.3s ease';
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'scale(1)';
        });
    });
});